"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  House,
  LogOut,
  Mail,
  Menu,
  MessagesSquare,
  Search,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { signOutAction } from "@/app/(app-wrapper)/actions/auth-actions";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { useUserStore } from "@/lib/stores/user-store";

export default function HeaderMenu() {
  const { request_count: initial_request_count, guild } = useUserStore();
  const { setRequestCount, request_count } = useUserStore();

  useEffect(() => {
    setRequestCount(initial_request_count);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border p-1.5 rounded-lg outline-none relative bg-neutral-900">
        <Menu size={20} />
        {request_count > 0 && (
          <div className="w-3 h-3 absolute bg-red-500 rounded-full -top-1 -right-1 block">
            &nbsp;
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[150px] bg-neutral-900">
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/" className="flex gap-1.5 items-center">
            <House size={15} />
            Home
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/guilds/search" className="flex gap-1.5 items-center">
            <Search size={15} />
            Guild Search
          </Link>
        </DropdownMenuItem>
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
          </>
        )}
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link
            href="/settings"
            className="flex gap-1.5 items-center"
          >
            <Settings size={15} />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <form action={signOutAction}>
          <Button
            className="h-auto py-1.5 px-2 w-full flex gap-1.5 border-none rounded-sm justify-start bg-neutral-900"
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
