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
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRequestStore } from "@/app/(app-wrapper)/guilds/search/request-store";
import { useEffect } from "react";
import { useUserStore } from "@/lib/stores/user-store";

export default function SettingsMenuMobile({ page } : { page: string }) {
  const { request_count: initial_request_count, guild } = useUserStore();
  const { setRequestCount, request_count } = useRequestStore();

  useEffect(() => {
    setRequestCount(initial_request_count);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border p-1.5 rounded-lg outline-none flex gap-2 items-center text-sm pr-3 cursor-pointer bg-neutral-900">
        <Menu size={20} /> {page}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[150px] bg-neutral-900">
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/settings/account" className="flex gap-1.5 items-center">
            <Settings size={15} />
            Account Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/settings/guild" className="flex gap-1.5 items-center">
            <Users size={15} />
            Guild Settings
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
