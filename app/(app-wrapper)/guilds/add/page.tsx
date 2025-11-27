import { getMCUsername } from "@/app/(app-wrapper)/actions/account-actions";
import Link from "next/link";
import AddGuildButton from "./components/add-guild-button";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getUserGuild } from "../../actions/guild-actions";

export default async function AddGuild() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-up");

  const userGuild = await getUserGuild(user.id);

  if (userGuild) redirect("/guilds/" + userGuild.hypixel_id);

  async function checkUsername() {
    const MCUsername = await getMCUsername();
    if (!MCUsername) {
      return (
        <p>
          Please{" "}
          <Link href="/settings/account" className="text-purple-400">
            add your Minecraft username
          </Link>{" "}
          before you add a guild!
        </p>
      );
    } else return <AddGuildButton />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Add Your Guild</h1>
      {checkUsername()}
    </div>
  );
}
