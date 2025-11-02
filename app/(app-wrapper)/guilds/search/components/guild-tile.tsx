import { Info, Medal, MonitorCheck, User } from "lucide-react";
import TopGameSmall from "./top-game-small";
import Link from "next/link";
import GuildTileFooter from "./guild-footer";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, wasWithinLast14Days } from "@/lib/utils";
import "./guild-tile.css";

export default function GuildTile({ guild }: { guild: guild }) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;

  const founded = new Date(guild.guild_founded_at).toLocaleDateString(
    undefined,
    options
  );

  return (
    <div className="border flex flex-col rounded-lg bg-neutral-900 divide-y w-full">
      <Link href={`/guilds/${guild.hypixel_id}`} className="divide-y w-full flex flex-col grow">
        <div className="p-3">
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl font-bold">{guild.name}</h2>
              <p className="text-xs text-gray-400">Created {founded}</p>
            </div>

            <div className="flex text-purple-500 items-center gap-1">
              <User size={17} />
              {guild.members_count}
            </div>
          </div>
          <div className="flex gap-1">
            {/* Guild medals */}
            {guild.rank && (
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <p className={cn("bg-neutral-700 w-fit px-1 rounded text-xs mt-1.5 py-0.5 flex gap-1 items-center", guild.rank === 1 && "gold", guild.rank === 2 && "silver", guild.rank === 3 && "bronze")}>
                    <Medal size={15} /> Ranked <span className="font-bold">#{guild.rank}</span>
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-sm">
                    This guild is ranked #{guild.rank} on Hypixel Guild Finder. Guilds are ranked by total guild exp.
                  </p>
                </TooltipContent>
              </Tooltip>
            )}
            {wasWithinLast14Days(Number(guild.owner_last_login)) && (
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <p className="bg-neutral-800 w-fit px-1 rounded text-xs mt-1.5 py-0.5 flex gap-1 items-center">
                    <MonitorCheck size={15} className="text-green-600" /> Online Recently
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-sm">
                    This badge indicates that the owner of this guild has logged
                    into Hypixel within the last 2 weeks, according to the Hypixel
                    API.
                  </p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
        <div className="p-3 grow">
          {guild.h_description ? (
            <p className="line-clamp-2">{guild.h_description}</p>
          ) : (
            <p className="text-neutral-400">No description...</p>
          )}
        </div>
        <div className="flex flex-col p-3 gap-2">
          <TopGameSmall game={guild.top_game_1} />
          <TopGameSmall game={guild.top_game_2} />
          <TopGameSmall game={guild.top_game_3} />
        </div>
        </Link>
        <GuildTileFooter guild={guild} />
    </div>
  );
}
