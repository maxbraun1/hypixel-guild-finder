"use server";

import {
  getGuildID,
  getMCUsername,
} from "@/app/(app-wrapper)/actions/account-actions";
import prisma from "@/lib/prisma";
import { UUIDtoUsername, getGuildInfo } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import axios from "axios";
import Mailgun from "mailgun.js";

export async function findUserGuild() {
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

export async function getUserGuild(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("guilds")
    .select()
    .eq("owner", userId);

  if (data) return data[0] as guild;
  return false;
}

export async function addGuild(guild: h_guild) {
  const id = guild._id;
  const name = guild.name;
  const description = guild.description;
  const member_count = guild.members.length;
  const guild_founded_date = new Date(parseInt(guild.created));
  const top_3_games = Object.entries(guild.guildExpByGameType)
    .sort(([, expA], [, expB]) => expB - expA)
    .slice(0, 3);
  const owner_uuid = guild.members.find(
    (member) => member.rank === "Guild Master"
  )?.uuid;

  if (!owner_uuid) return null;

  const owner_username = await UUIDtoUsername(owner_uuid);

  const supabase = await createClient();
  const userid = (await supabase.auth.getUser()).data.user?.id;

  if (!userid) return null;

  const { data, error } = await supabase
    .from("guilds")
    .insert({
      hypixel_id: id,
      owner: userid,
      owner_username,
      name,
      h_description: description,
      members_count: member_count,
      guild_founded_at: guild_founded_date,
      top_game_1: { name: top_3_games[0][0], exp: top_3_games[0][1] },
      top_game_2: { name: top_3_games[1][0], exp: top_3_games[1][1] },
      top_game_3: { name: top_3_games[2][0], exp: top_3_games[2][1] },
    })
    .select("id");

  if (error) {
    console.log(error);
    return null;
  }

  return data[0].id as string;
}

export async function fetchAndUpdateGuild(id: string) {
  // Fetch Guild ID
  const supabase = await createClient();

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
  const one_day_ago = Date.now() - 1000 * 60 * 60 * 6;
  if (last_updated > one_day_ago) {
    // was updated less than 24 hours ago
    return data[0] as guild;
  }

  // Get guild info from Hypixel API
  const guild = await axios
    .get(
      `https://api.hypixel.net/guild?key=${process.env.HYPIXEL_KEY}&id=${data[0].hypixel_id}`
    )
    .then(async (response) => {
      if (response.data.success) {
        if (response.data.guild === null) {
          // Guild has been disbanded
          console.log("guild has been disbanded. ID: ", id);
          await supabase.from("guilds").delete().eq("hypixel_id", id);
          return null;
        }
        return response.data.guild as h_guild;
      } else {
        return null;
      }
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
  const top_3_games = Object.entries(guild.guildExpByGameType)
    .sort(([, expA], [, expB]) => expB - expA)
    .slice(0, 3);
  const owner_uuid = guild.members.find(
    (member) => member.rank === "Guild Master"
  )?.uuid;

  if (!owner_uuid) return null;

  const owner_username = await UUIDtoUsername(owner_uuid);

  const { data: newdata, error: newerror } = await supabase
    .from("guilds")
    .update({
      hypixel_id: guild_id,
      name,
      h_description: description,
      owner_username,
      members_count: member_count,
      guild_founded_at: guild_founded_date,
      last_updated: new Date(),
      top_game_1: { name: top_3_games[0][0], exp: top_3_games[0][1] },
      top_game_2: { name: top_3_games[1][0], exp: top_3_games[1][1] },
      top_game_3: { name: top_3_games[2][0], exp: top_3_games[2][1] },
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
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;

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
  const supabase = await createClient();
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

export async function getTopGuilds() {
  const supabase = await createClient();

  const { data: guilds, error } = await supabase
    .from("guilds")
    .select()
    .order("members_count", { ascending: false })
    .eq("verified", true);

  if (error || guilds.length < 1) {
    error && console.log(error);
    return null;
  }

  return guilds as guild[];
}

export async function guildSearch(
  term: string | null,
  topGame: string | null,
  guildSize: string | null,
  page: number | null
) {
  // Number of results to return per page
  const resultsPerPage = 12;

  const guildSizeValues = ["small", "medium", "large"];
  if (
    guildSize !== "small" &&
    guildSize !== "medium" &&
    guildSize !== "large"
  ) {
    guildSize = null;
  }
  // guild sizes
  const sizes = {
    small: [0, 20],
    medium: [21, 80],
    large: [80, 1000],
  };
  const supabase = await createClient();

  let query = supabase
    .from("guilds")
    .select("*", { count: "exact" })
    .order("members_count", { ascending: false })
    .eq("verified", true);

  if (term) {
    query = query.textSearch("name", term, {
      type: "plain",
      config: "english",
    });
  }

  if (guildSize) {
    query
      .gte("members_count", sizes[guildSize][0])
      .lte("members_count", sizes[guildSize][1]);
  }

  if (topGame) {
    query.eq("top_game_1->name", JSON.stringify(topGame));
  }

  if (page) {
    query.range(resultsPerPage * (page - 1), resultsPerPage * page - 1);
  } else {
    query.range(0, resultsPerPage - 1);
  }

  const { data: guilds, count, error } = await query;

  if (error || guilds.length < 1) {
    error && console.log(error);
    return { error, data: null, count: 0, perPage: 0 };
  }

  return { error: false, data: guilds, count, perPage: resultsPerPage } as {
    error: boolean;
    data: guild[];
    count: number;
    perPage: number;
  };
}

export async function sendRequestReminderEmails() {
  const requests = await prisma.requests.groupBy({
    by: ["guild_id"],
    where: {
      viewed: false,
      guild_id: {
        not: null,
      },
    },
  });

  let guildIds: string[] = [];

  for (let request of requests) {
    if (request.guild_id) guildIds.push(request.guild_id);
  }

  if (guildIds.length === 0) return false;

  const guildsWithProfiles = await prisma.guilds.findMany({
    where: {
      id: {
        in: guildIds,
      },
    },
    include: {
      profiles: true,
    },
  });

  // {{guild_name}} {{view_requests_url}} {{unsubscribe_link}}

  // Send emails
  const mailgun = new Mailgun(FormData);

  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "api_key",
  });

  const base_url = process.env.NEXT_PUBLIC_DEV
    ? "http://localhost:3000"
    : "https://www.hypixelguildfinder.com";

  for (let guildWithProfile of guildsWithProfiles) {
    if (guildWithProfile.profiles.email) {
      try {
        await mg.messages.create("hypixelguildfinder.com", {
          from: "Hypixel Guild Finder <info@hypixelguildfinder.com>",
          to: [guildWithProfile.profiles.email],
          template: "Unread Invite Requests Reminder",
          "h:X-Mailgun-Variables": JSON.stringify({
            guild_name: guildWithProfile.name,
            view_requests_url:
              base_url + "/sign-in?redirectURL=requests/incoming",
          }),
        });
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
  return guildsWithProfiles.length;
}
