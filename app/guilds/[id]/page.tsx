import { getGuildInfo, getGuildMaster } from "@/lib/utils";
import { fetchAndUpdateGuild } from "../guild-actions";
import Image from "next/image";
import TopGame from "./components/top-game";
import NoResults from "@/components/no-results";
import { SearchX } from "lucide-react";
import Link from "next/link";
import NotFound from "./components/not-found";

export default async function GuildPage({
  params,
}: {
  params: { id: string };
}) {
  const guild = await fetchAndUpdateGuild(params.id);

  if (!guild) return <NotFound />;

  const h_guild = await getGuildInfo(guild.hypixel_id);

  if (!h_guild) return;

  const master = await getGuildMaster(h_guild);

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
    <div className="w-full">
      {/* HEADER */}
      <div className="border-b p-5">
        <h1 className="text-3xl font-bold mb-1">{guild.name}</h1>
        <p className="text-gray-400 text-sm">
          Created <span className="text-purple-500">{founded}</span>
        </p>
        <p className="text-gray-400 text-sm">
          <span className="text-purple-500">{guild.members_count}</span>{" "}
          member(s)
        </p>
      </div>

      {/* BODY */}
      <div className="flex divide-x">
        {/* LEFT PANEL */}
        <div className="w-3/4 p-5 space-y-10">
          <div>
            <h2 className="text-xl font-bold text-gray-300">Description</h2>
            <p className="text-sm">{guild.description}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Owner</h3>
            <div className="flex items-center gap-4">
              <Image
                width={50}
                height={50}
                className="rounded overflow-hidden"
                src={`https://mc-heads.net/avatar/${master}`}
                alt={master}
              />
              {master}
            </div>
          </div>
        </div>
        {/* RIGHT PANEL */}
        <div className="w-1/4 p-5">
          <h2 className="text-xl font-bold mb-3">Top 3 Games</h2>
          <div className="flex flex-col gap-4">
            <TopGame game={guild.top_game_1} />
            <TopGame game={guild.top_game_2} />
            <TopGame game={guild.top_game_3} />
          </div>
        </div>
      </div>
    </div>
  );
}