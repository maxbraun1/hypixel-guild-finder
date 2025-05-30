import { getGuildInfo, getGuildMaster } from "@/lib/utils";
import { fetchAndUpdateGuild } from "../../actions/guild-actions";
import Image from "next/image";
import TopGame from "./components/top-game";
import "./description-styles.css";
import NotFound from "./components/not-found";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import DiscordLogo from "@/public/assets/discord-icon.webp";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import GuildFooter from "./components/guild-footer";

export default async function GuildPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let { id } = await params;
  const guild = await fetchAndUpdateGuild(id);

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
      <Link
        href="/guilds/search"
        className="flex gap-2 rounded hover:bg-neutral-900 w-fit px-3 py-1.5 items-center"
      >
        <ArrowLeft size={15} />
        <p>Search Guilds</p>
      </Link>
      {/* HEADER */}
      <div className="border-b p-5">
        <h1 className="text-3xl font-bold mb-1">{guild.name}</h1>
        <p className="text-gray-400 text-sm">
          Created <span className="text-purple-500">{founded}</span>
        </p>
        <p className="text-gray-400 text-sm">
          <span className="text-purple-500">{guild.members_count}</span> member
          {guild.members_count !== 1 && "s"}
        </p>
      </div>

      {/* BODY */}
      <div className="flex flex-col divide-x-0 md:flex-row md:divide-x">
        {/* LEFT PANEL */}
        <div className="w-full md:w-3/4 p-5 space-y-5">
          <div>
            {guild.description && (
              <>
                <h2 className="text-xl font-bold text-purple-400">
                  Description
                </h2>
                <div
                  id="description"
                  className="py-5"
                  dangerouslySetInnerHTML={{
                    __html: guild.description || "No description set...",
                  }}
                />
                <Separator />
              </>
            )}
            <div className="py-5">
              <h2 className="text-xl font-bold text-purple-400">
                Hypixel Guild Description
              </h2>
              <p className="text-sm mt-2">
                {guild.h_description || "No description added..."}
              </p>
            </div>
          </div>
          <Separator />
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
        <div className="w-full min-w-fit md:w-1/4 p-5 border-t md:border-t-0 space-y-5">
          <div>
            <h2 className="text-xl font-bold mb-3">Top 3 Games</h2>
            <div className="flex flex-col gap-4 justify-center">
              <TopGame game={guild.top_game_1} />
              <TopGame game={guild.top_game_2} />
              <TopGame game={guild.top_game_3} />
            </div>
          </div>

          {guild.discord_link && (
            <div>
              <h2 className="text-xl font-bold mb-3">Guild Links</h2>
              <a href={guild.discord_link} target="_blank">
                <Button variant="secondary" className="flex gap-2">
                  <Image
                    width={25}
                    height={25}
                    src={DiscordLogo}
                    alt="Discord logo"
                  />
                  Discord Server
                </Button>
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="w-full p-3 flex justify-end">
        <GuildFooter guild_id={guild.id} guild_name={guild.name} />
      </div>
    </div>
  );
}
