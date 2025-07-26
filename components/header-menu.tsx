"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
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
      <DropdownMenuContent>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/">Home</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/account">My Account</Link>
        </DropdownMenuItem>
        {guild && (
          <>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/requests/incoming" className="flex gap-2">
                Requests
                {request_count > 0 && (
                  <div className="bg-red-500 rounded-full text-white text-xs px-2">
                    {request_count}
                  </div>
                )}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/account/guild-settings">Guild Settings</Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <form action={signOutAction}>
          <Button
            className="h-auto py-1.5 px-3 w-full"
            type="submit"
            variant={"outline"}
          >
            Sign out
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
