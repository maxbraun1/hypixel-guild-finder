import { getGuildInfo, getGuildMaster } from "@/lib/utils";
import { fetchAndUpdateGuild } from "../../actions/guild-actions";
import "./description-styles.css";
import NotFound from "./components/not-found";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import GuildHeader from "./components/guild-header";
import GuildBody from "./components/guild-body";
import GuildSidebar from "./components/guild-sidebar";

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
        className="flex gap-2 rounded bg-neutral-900 hover:bg-neutral-800 w-fit px-3 py-1.5 items-center mb-3"
      >
        <ArrowLeft size={15} />
        <p>Search Guilds</p>
      </Link>

      <GuildHeader guild_id={guild.id} guild_name={guild.name} owner_last_login={guild.owner_last_login} />

      <div className="flex my-5 gap-5 items-stretch flex-col md:flex-row">
        <GuildBody description={guild.description} hypixel_description={guild.h_description}/>
        <GuildSidebar guild={guild}/>
      </div>
    </div>
  );
}
