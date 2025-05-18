import { getMCUsername } from "@/app/actions/account-actions";
import Link from "next/link";
import AddGuildButton from "./components/add-guild-button";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function AddGuild() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-up");

  async function checkUsername() {
    const MCUsername = await getMCUsername();
    if (!MCUsername) {
      return (
        <p>
          Please{" "}
          <Link href="/account" className="text-purple-400">
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
