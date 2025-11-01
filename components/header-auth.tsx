"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { BadgeCheck, Eye, Plus } from "lucide-react";
import HeaderMenu from "./header-menu";
import { useUserStore } from "@/lib/stores/user-store";

export default function AuthButton() {
  const { user, guild } = useUserStore();

  return user ? (
    <div className="flex items-center gap-2">
      {PrimaryButton(guild)}
      <HeaderMenu />
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

function PrimaryButton(guild: guild | null) {

  if (!guild) {
    // If no guild
    return (
      <a href="/guilds/add">
        <Button className="h-auto py-1.5 px-3 flex gap-1">
          <Plus size={15} /> Add Your Guild
        </Button>
      </a>
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
          <Eye size={18} /> View Your Guild
        </Button>
      </Link>
    );
  }
}
