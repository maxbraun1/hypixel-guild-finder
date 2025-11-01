import {
  getGuild,
  getGuildSettings,
} from "@/app/(app-wrapper)/actions/account-actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import GuildSettingsForm from "./components/guild-settings-form";

export default async function GuildSettings() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const guild = await getGuild();

  if (!guild) redirect("/guilds/add");

  const guild_settings = await getGuildSettings();

  return <GuildSettingsForm current_values={guild_settings} />;
}
