import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import MCUsernameForm from "./components/mc-name-form";

export default async function AccountInfo() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  return (
    <>
      <h1 className="text-3xl font-bold mb-5">Account Info</h1>
      <MCUsernameForm />
    </>
  );
}
