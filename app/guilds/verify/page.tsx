import { getGuildID } from "@/app/actions/account-actions";
import { redirect } from "next/navigation";
import VerificationButton from "./components/verification-button";

export default async function VerifyGuild() {
  const guild = await getGuildID();

  if (!guild) redirect("/guilds/add");

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">Verify Your Guild</h1>
      <p className="text-sm text-gray-400">
        Only verified guilds will be shown to users.
      </p>
      <VerificationButton />
    </div>
  );
}
