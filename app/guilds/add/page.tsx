import { getMCUsername } from "@/app/actions/account-actions";
import Link from "next/link";
import AddGuildButton from "./components/add-guild-button";

export default async function AddGuild() {
  async function checkUsername() {
    const MCUsername = await getMCUsername();
    if (!MCUsername) {
      return (
        <p>
          Please{" "}
          <Link href="/account-info" className="text-purple-400">
            add your Minecraft username
          </Link>{" "}
          before you add a guild!
        </p>
      );
    } else return <AddGuildButton />;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-5">Add Your Guild</h1>
      {checkUsername()}
    </>
  );
}
