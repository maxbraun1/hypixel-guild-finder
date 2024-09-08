import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { BadgeCheck, Check, Plus } from "lucide-react";
import { signOutAction } from "@/app/actions/auth-actions";
import { getGuild } from "@/app/actions/account-actions";

export default async function AuthButton() {
  const client = createClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      {PrimaryButton()}
      <form action={signOutAction}>
        <Button
          className="h-auto py-1.5 px-3"
          type="submit"
          variant={"outline"}
        >
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}

async function PrimaryButton() {
  const guild = await getGuild();

  if (!guild) {
    // If no guild
    return (
      <Link href="/guilds/add">
        <Button className="h-auto py-1.5 px-3 flex gap-1">
          <Plus size={15} /> Add Your Guild
        </Button>
      </Link>
    );
  } else if (!guild.verified) {
    // if guild isn't verified
    return (
      <Link href="/guilds/verify">
        <Button className="h-auto py-1.5 px-3 flex gap-1">
          <BadgeCheck size={15} /> Verify Your Guild
        </Button>
      </Link>
    );
  } else {
    // if guild is added and verified
    return (
      <Link href={`/guilds/${guild.hypixel_id}`}>
        <Button className="h-auto py-1.5 px-3 flex gap-1">
          <Check size={15} /> View Your Guild
        </Button>
      </Link>
    );
  }
}
