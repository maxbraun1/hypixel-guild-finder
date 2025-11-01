"use client";

import TopGame from "./top-game";
import { Button } from "@/components/ui/button";
import { Calendar, MessagesSquare, Sparkle, User } from "lucide-react";
import DiscordLogo from "@/public/assets/discord-icon.webp";
import Image from "next/image";

export default function GuildSidebar({
  guild
}: {
  guild: guild
}) {
  return (
    <div className="bg-neutral-900 rounded-lg space-y-5 p-4 font-display basis-[300px] w-full">
      <div className="bg-neutral-800 rounded-md p-2 flex items-start gap-2">
          <Image
            width={30}
            height={30}
            className="rounded overflow-hidden"
            src={`https://mc-heads.net/avatar/${guild.owner_username}`}
            alt={guild.owner_username}
          />
          <div>
            <h3 className="text-neutral-400 leading-4 uppercase text-xs">Owner</h3>
            <h2 className="text-base font-bold leading-4">{guild.owner_username}</h2>
          </div>
        </div>
      <div>
        <h2 className="text-xl font-bold mb-3">Guild Stats</h2>
        <div className="flex flex-col gap-2 justify-center">
          <div className="w-full bg-neutral-950 rounded-md px-2.5 py-1.5 flex justify-between items-center">
            <h1 className="flex gap-1 items-center text-sm text-neutral-300"><Sparkle size={16} />Top XP</h1>
            <p className="font-bold">{guild.top_game_1.exp}</p>
          </div>
          <div className="w-full bg-neutral-950 rounded-md px-2.5 py-1.5 flex justify-between items-center">
            <h1 className="flex gap-1 items-center text-sm text-neutral-300"><User size={16} />Members</h1>
            <p className="font-bold">{guild.members_count}</p>
          </div>
          <div className="w-full bg-neutral-950 rounded-md px-2.5 py-1.5 flex justify-between items-center">
            <h1 className="flex gap-1 items-center text-sm text-neutral-300"><Calendar size={16} />Age</h1>
            <p className="font-bold">{timeAgo(guild.guild_founded_at)}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Top 3 Games</h2>
        <div className="flex flex-col gap-4 justify-center">
          <TopGame game={guild.top_game_1} />
          <TopGame game={guild.top_game_2} />
          <TopGame game={guild.top_game_3} />
        </div>
      </div>

      {(guild.discord_link || guild.hypixel_forum_link) && (
        <div>
          <h2 className="text-xl font-bold mb-3">Guild Links</h2>
          <div className="space-y-3">
            {guild.discord_link && (
              <a
                href={guild.discord_link}
                className="block"
                target="_blank"
              >
                <Button
                  variant="secondary"
                  className="flex w-full gap-2 px-2 bg-[#5865f2] hover:bg-[#4e5ad7]"
                >
                  <Image
                    width={20}
                    height={20}
                    src={DiscordLogo}
                    alt="Discord logo"
                  />
                  Discord Server
                </Button>
              </a>
            )}
            {guild.hypixel_forum_link && (
              <a
                className="block"
                href={guild.hypixel_forum_link}
                target="_blank"
              >
                <Button
                  variant="secondary"
                  className="flex gap-2 w-full bg-[#ca9c32] hover:bg-[#b68d2d] px-2"
                >
                  <MessagesSquare size={20}/>
                  Hypixel Forums Post
                </Button>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  if (diffMs < 0) return "just now"; // handles future dates gracefully

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (days < 30) return "< 1 month";
  if (months < 12) return `${months} month${months === 1 ? "" : "s"}`;
  return `${years} year${years === 1 ? "" : "s"}`;
}