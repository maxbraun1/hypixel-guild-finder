import { User } from "lucide-react";
import TopGameSmall from "./top-game-small";
import Link from "next/link";
import GuildTileFooter from "./guild-footer";

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
      className="border flex flex-col rounded divide-y w-full"
    >
      <div className="flex justify-between p-3">
        <h2 className="text-xl font-bold">{guild.name}</h2>
        <div className="flex text-purple-500 items-center gap-1">
          <User size={17} />
          {guild.members_count}
        </div>
      </div>
      <div className="p-3 flex-grow">
        <p className="text-xs text-gray-400">Created {founded}</p>
        <p>{guild.h_description}</p>
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
