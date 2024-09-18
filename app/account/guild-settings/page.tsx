import { getGuild } from "@/app/actions/account-actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function GuildSettings() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const guild = await getGuild();

  if (!guild) redirect("/guilds/add");

  return (
    <>
      <h1 className="text-3xl font-bold mb-5">Guild Settings</h1>
    </>
  );
}
