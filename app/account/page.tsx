import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import MCUsernameForm from "./components/mc-name-form";

export default async function AccountInfo({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  if (searchParams) console.log(searchParams);

  return (
    <>
      <h1 className="text-3xl font-bold mb-5">Account Info</h1>
      <MCUsernameForm />
    </>
  );
}
