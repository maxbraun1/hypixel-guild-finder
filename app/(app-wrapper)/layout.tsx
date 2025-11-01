import InitializeUserStore from "@/components/initializeUserStore";
import { TooltipProvider } from "@/components/ui/tooltip";
import { createClient } from "@/utils/supabase/server";
import { getGuild, getRequestCount } from "./actions/account-actions";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import HeaderAuth from "@/components/header-auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch sidewide data for stores
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();
  const userData = user ? { id: user.id, email: user.email as string } : null;
  const guild = await getGuild();
  const request_count = guild ? (await getRequestCount(guild.id)) || 0 : 0;
  
  return (
    <TooltipProvider>
      <InitializeUserStore userData={{ user: userData, guild, request_count}} />
      <main className="min-h-screen flex flex-col items-center">
        <nav className="w-full flex justify-center h-16 border-b">
          <div className="w-full max-w-5xl flex gap-5 justify-between items-center py-3 text-sm px-3 lg:px-0">
            <Link
              className="font-display font-black uppercase text-2xl leading-5 md:text-4xl"
              href={"/"}
            >
              Hypixel Guild Finder
            </Link>
            <HeaderAuth />
          </div>
        </nav>
        
        <div className="w-full max-w-5xl flex-grow flex flex-col px-5 lg:px-0">
          {children}
        </div>
    

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-4 py-5 bg-neutral-900">
          <p>
            Developed by{" "}
            <a target="_blank" href="https://maxbraun.us">
              Max Braun
            </a>
          </p>{" "}
          &mdash;
          <Link className="text-purple-400" href="/contact">
            Contact Me
          </Link>
          &mdash;
          <Link className="text-purple-400" href="/privacy-policy">
            Privacy Policy
          </Link>
        </footer>
      </main>
      <Toaster />
    </TooltipProvider>
  );
}
