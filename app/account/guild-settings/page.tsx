import { getGuild, getGuildSettings } from "@/app/actions/account-actions";
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

  return (
    <>
      <h1 className="text-3xl font-bold mb-5">Guild Settings</h1>
      <GuildSettingsForm current_values={guild_settings} />
    </>
  );
}
