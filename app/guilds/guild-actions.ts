"use server";

import { getGuildID, getMCUsername } from "@/app/actions/account-actions";
import { getGuildInfo } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import axios from "axios";

export default async function findUserGuild() {
  const username = await getMCUsername();

  if (!username) return null;

  const uuid = await axios
    .get(`https://api.mojang.com/users/profiles/minecraft/${username}`)
    .then((response) => {
      return response.data.id;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  const guild = await axios
    .get(
      `https://api.hypixel.net/guild?key=${process.env.HYPIXEL_KEY}&player=${uuid}`
    )
    .then((response) => {
      if (response.data.success) {
        return response.data.guild as h_guild;
      } else return null;
    })
    .catch((err) => {
      console.log(err.response.data);
      return null;
    });

  if (!guild) return null;

  const owner = guild.members.find((member) => member.rank === "Guild Master");
  if (owner?.uuid === uuid) return guild;
  return null;
}

export async function addGuild(guild: h_guild) {
  const id = guild._id;
  const name = guild.name;
  const description = guild.description;
  const member_count = guild.members.length;
  const guild_founded_date = new Date(parseInt(guild.created));
  const top_3_games = Object.fromEntries(
    Object.entries(guild.guildExpByGameType)
      .sort(([, expA], [, expB]) => expB - expA)
      .slice(0, 3)
  );

  const supabase = createClient();
  const userid = (await supabase.auth.getUser()).data.user?.id;

  if (!userid) return null;

  const { data, error } = await supabase
    .from("guilds")
    .insert({
      hypixel_id: id,
      owner: userid,
      name,
      description,
      members_count: member_count,
      guild_founded_at: guild_founded_date,
      top_3_games,
    })
    .select("id");

  if (error) {
    console.log(error);
    return null;
  }

  return data[0].id;
}

export async function fetchAndUpdateGuild(id: string) {
  // Fetch Guild ID
  const supabase = createClient();

  const { data, error } = await supabase
    .from("guilds")
    .select()
    .eq("hypixel_id", id);

  if (error || !data || data.length < 1) {
    console.log(error);
    return null;
  }

  // Return data and skip updating if guild has been updated within last 24 hours
  const last_updated = new Date(data[0].last_updated).getTime();
  const one_day_ago = Date.now() - 1000 * 60 * 60 * 24;
  if (last_updated > one_day_ago) {
    // was updated less than 24 hours ago
    console.log("skipped update");
    return data[0] as guild;
  }

  // Get guild info from Hypixel API
  const guild = await axios
    .get(
      `https://api.hypixel.net/guild?key=${process.env.HYPIXEL_KEY}&id=${data[0].hypixel_id}`
    )
    .then((response) => {
      if (response.data.success) {
        return response.data.guild as h_guild;
      } else return null;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  if (!guild) return null;

  // Update guild info
  const guild_id = guild._id;
  const name = guild.name;
  const description = guild.description;
  const member_count = guild.members.length;
  const guild_founded_date = new Date(parseInt(guild.created));
  const top_3_games = Object.fromEntries(
    Object.entries(guild.guildExpByGameType)
      .sort(([, expA], [, expB]) => expB - expA)
      .slice(0, 3)
  );

  const { data: newdata, error: newerror } = await supabase
    .from("guilds")
    .update({
      hypixel_id: guild_id,
      name,
      description,
      members_count: member_count,
      guild_founded_at: guild_founded_date,
      top_3_games,
      last_updated: new Date(),
    })
    .eq("hypixel_id", id)
    .select();

  if (newerror) {
    console.log(newerror);
    return null;
  }

  return newdata[0] as guild;
}

export async function createGuildVerificationCode() {
  const guild = await getGuildID();
  const supabase = createClient();
  const user = (await supabase.auth.getUser()).data.user;

  console.log("Guild", guild);

  if (!user) return null;

  const data = {
    jsonrpc: "2.0",
    method: "generateStrings",
    params: {
      apiKey: process.env.RANDOM_ORG_API_KEY,
      n: 1,
      length: 8,
      characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    },
    id: 1,
  };

  const verification_code = await axios
    .post("https://api.random.org/json-rpc/2/invoke", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((response) => {
      return response.data.result.random.data[0];
    })
    .catch((err) => {
      console.log(err);
    });

  if (!verification_code) return null;

  const { error } = await supabase
    .from("verify_tokens")
    .upsert({ guild: guild, code: verification_code, user: user.id });

  if (error) {
    console.log(error);
    return null;
  }

  return verification_code;
}

export async function verifyGuild() {
  const supabase = createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) return false;

  // get guild

  const { data: guild, error: guildError } = await supabase
    .from("guilds")
    .select()
    .eq("owner", user.id);

  if (!guild || guildError) {
    guildError && console.log(guildError);
    return false;
  }

  const h_guild = await getGuildInfo(guild[0].hypixel_id);

  if (!h_guild) return false;

  // get code
  const { data: code, error } = await supabase
    .from("verify_tokens")
    .select()
    .eq("user", user.id);

  if (error || !code) {
    console.log(error);
    return false;
  }

  if (h_guild.description.includes(code[0].code)) {
    // verification complete
    // Update guild to verified
    const { error: verifyError } = await supabase
      .from("guilds")
      .update({ verified: true })
      .eq("id", guild[0].id);

    if (verifyError) return false;

    // Delete verification code
    const { error: deleteError } = await supabase
      .from("verify_tokens")
      .delete()
      .eq("user", user.id);

    if (deleteError) console.log(deleteError);

    return true;
  }

  return false;
}
