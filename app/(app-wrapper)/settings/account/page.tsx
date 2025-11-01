import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import MCUsernameForm from "../_components/mc-name-form";

export default async function AccountInfo() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  return <MCUsernameForm />
}
