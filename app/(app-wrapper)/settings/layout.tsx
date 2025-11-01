"use client"

import { Settings, Users } from "lucide-react";
import { redirect, usePathname } from "next/navigation";
import { SidebarLink } from "./_components/sidebar-link";
import { useUserStore } from "@/lib/stores/user-store";
import SettingsMenuMobile from "./_components/settings-menu-mobile";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { guild } = useUserStore();

  const settingsPages = [
    { url: "/settings/account", name: "Account Settings", description: "Configure your account." },
    { url: "/settings/guild", name: "Guild Settings", description: "Configure your guild listing." },
  ];

  const page = settingsPages.find(page => page.url === pathname);

  if(pathname === "/settings") redirect("/settings/account");

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px-57px)] w-full">
      {/* Sidebar */}
      <aside className="w-fit border-r border-neutral-800 hidden py-6 px-4 md:flex min-w-[200px] flex-col gap-2">
        <h1 className="text-2xl font-bold">Settings</h1>
        <nav className="space-y-1">
          <SidebarLink href="/settings/account" icon={<Settings className="h-4 w-4" />} label="Account" />
          { guild && <SidebarLink href="/settings/guild" icon={<Users className="h-4 w-4" />} label="Guild" />}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 px-0 md:px-6 overflow-y-auto">
        <div className="md:hidden mb-2">
          <SettingsMenuMobile page={page?.name || "Settings"} />
        </div>

        { page &&
          <div className="border-b border-neutral-800 pb-3">
            <h1 className="text-2xl font-bold">{page.name}</h1>
            <p className="text-neutral-400 text-sm">{page.description}</p>
          </div>
        }
        {children}
      </main>
    </div>
  );
}


