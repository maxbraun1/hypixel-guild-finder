"use server";

import { createClient } from "@/utils/supabase/server";

export async function updateMCUsername(username: string) {
  const supabase = createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) return { error: "Invalid session" };

  // Check if username is taken
  const { data } = await supabase
    .from("profiles")
    .select("id")
    .eq("mc_username", username)
    .limit(1);

  if (data && data.length > 0) return { error: "Username already in use" };

  // validations
  const alphanumeric = new RegExp("^[a-zA-Z0-9_]*$").test(username);
  const length = username.length >= 3 && username.length <= 16;

  if (!username || !alphanumeric || !length) {
    return { error: "Invalid username." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ mc_username: username })
    .eq("id", user.id);

  if (error) {
    console.error(error.code + " " + error.message);
    return { error: "An error occured while updating your username." };
  } else {
    return null;
  }
}

export async function getMCUsername() {
  const supabase = createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("mc_username")
    .eq("id", user.id)
    .limit(1);

  if (error) {
    console.log(error);
    return null;
  }

  return data[0].mc_username as string;
}

export async function getGuildID() {
  const supabase = createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) return null;

  const { data, error } = await supabase
    .from("guilds")
    .select("id")
    .eq("owner", user.id)
    .limit(1);

  if (error) return null;
  return data[0]?.id;
}

export async function getGuild() {
  const supabase = createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) return null;

  const { data, error } = await supabase
    .from("guilds")
    .select()
    .eq("owner", user.id)
    .limit(1);

  if (error) return null;
  return data[0] as guild;
}

export async function sendRequest(
  username: string,
  message: string,
  guild_id: string
) {
  const supabase = createClient();
  const user = (await supabase.auth.getUser()).data.user;
  const sevenDaysAgo = new Date(
    Date.now() - 7 * 24 * 60 * 60 * 1000
  ).toISOString();

  const { data: requests, error: requestError } = await supabase
    .from("requests")
    .select()
    .eq("guild_id", guild_id)
    .eq("username", username)
    .gte("created_at", sevenDaysAgo);

  if (requests && requests.length > 0) return false;

  const { error } = await supabase
    .from("requests")
    .insert({ guild_id, username, message });

  if (error) return false;
  return true;
}

export async function getRequests() {
  const supabase = createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) return null;

  const guild = await getGuild();

  if (!guild) return null;

  const { data: requests, error } = await supabase
    .from("requests")
    .select()
    .eq("guild_id", guild.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return null;
  }

  return requests as request[];
}