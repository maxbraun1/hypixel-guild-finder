import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getUserGuild } from "../actions/guild-actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DiscordLinkButton from "./_components/discord-link-button";

export default async function DiscordLinkPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Preserve original query string
  const queryString = new URLSearchParams(
    Object.entries(await searchParams).flatMap(([key, value]) =>
      Array.isArray(value)
        ? value.map(v => [key, v])
        : value
        ? [[key, value]]
        : []
    )
  ).toString();

  if (!user) {
    redirect(`/sign-in?redirectUrl=${encodeURIComponent(`/discord-link?${queryString}`)}`);
  }

  const guild = await getUserGuild(user.id);

  const guildId = (await searchParams)["guildid"];
  const channelId = (await searchParams)["channelid"];
  const discordUserId = (await searchParams)["userid"];

  if(!guildId || !channelId || !discordUserId) throw new Error('Invalid Discord Data');
    
  const discordGuildName = await getDiscordGuildName(guildId);

  if(!guild){
    return (
      <div className="w-full flex justify-center">
        <div className="p-10 w-full max-w-3xl text-center">
          <h1 className="font-display text-6xl uppercase font-black">Guild Not Found</h1>
          <p className="text-lg text-neutral-300">It looks like you don't have a guild yet. Click below to add yours now!</p>
          <Link href="/guilds/add"><Button className="text-lg gap-2 mt-5">Add Your Guild <ArrowRight /></Button></Link>
        </div>
      </div>
    );
  } else {
    return (
      <DiscordLinkButton discordChannelId={channelId} discordGuildId={guildId} discordGuildName={discordGuildName} discordUserId={discordUserId} />
    );
  }
}

async function getDiscordGuildName(discordGuildId: string){
  try {
    const response = await fetch(
      `https://discord.com/api/v10/guilds/${discordGuildId}`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      console.error(`Discord API returned ${response.status}`);
      return null;
    }

    const guild = await response.json();
    return guild.name || null;
  } catch (error) {
    console.error('Failed to fetch guild:', error);
    return null;
  }
}