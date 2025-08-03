"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CircleUser,
  House,
  LogOut,
  Mail,
  Menu,
  MessagesSquare,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { signOutAction } from "@/app/(app-wrapper)/actions/auth-actions";
import { Button } from "./ui/button";
import { useRequestStore } from "@/app/(app-wrapper)/guilds/search/request-store";
import { useEffect } from "react";

export default function HeaderMenu({
  initial_request_count,
  guild,
}: {
  initial_request_count: number;
  guild: boolean;
}) {
  const { setRequestCount, request_count } = useRequestStore();

  useEffect(() => {
    setRequestCount(initial_request_count);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border p-1.5 rounded-lg outline-none relative">
        <Menu size={20} />
        {request_count > 0 && (
          <div className="w-3 h-3 absolute bg-red-500 rounded-full -top-1 -right-1 block">
            &nbsp;
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[150px]">
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/" className="flex gap-1.5 items-center">
            <House size={15} />
            Home
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/account" className="flex gap-1.5 items-center">
            <CircleUser size={15} />
            My Account
          </Link>
        </DropdownMenuItem>
        {guild && (
          <>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link
                href="/requests/incoming"
                className="flex gap-1.5 items-center"
              >
                <Mail size={15} />
                Requests
                {request_count > 0 && (
                  <div className="bg-red-500 rounded-full text-white text-xs px-2">
                    {request_count}
                  </div>
                )}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link
                href="/account/guild-settings"
                className="flex gap-1.5 items-center"
              >
                <Settings size={15} />
                Guild Settings
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link
            href="https://discord.gg/4EskQNm3g4"
            target="_blank"
            className="flex gap-1.5 items-center"
          >
            <MessagesSquare size={15} />
            Join Discord
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <form action={signOutAction}>
          <Button
            className="h-auto py-1.5 px-3 w-full flex gap-1.5 border-none rounded-sm justify-start"
            type="submit"
            variant={"outline"}
          >
            <LogOut size={15} />
            Sign out
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
