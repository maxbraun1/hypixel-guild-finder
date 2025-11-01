import { Info, User } from "lucide-react";
import TopGameSmall from "./top-game-small";
import Link from "next/link";
import GuildTileFooter from "./guild-footer";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { wasWithinLast14Days } from "@/lib/utils";

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
    <Link
      href={`/guilds/${guild.hypixel_id}`}
      className="border flex flex-col rounded-lg bg-neutral-900 divide-y w-full"
    >
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
        {wasWithinLast14Days(Number(guild.owner_last_login)) && (
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <p className="bg-amber-500 w-fit px-1 rounded text-xs mt-1.5 py-0.5 flex gap-0.5 items-center">
                Online Recently <Info size={11} />
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
      <div className="p-3 flex-grow">
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
      <GuildTileFooter guild={guild} />
    </Link>
  );
}
