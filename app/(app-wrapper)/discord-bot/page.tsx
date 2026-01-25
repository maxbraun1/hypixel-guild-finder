import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Discord Bot | Hypixel Guild Finder",
  description: "Get notified in your Discord server when players request to join your guild through Hypixel Guild Finder.",
};

export default function DiscordBot() {
  return (
    <div className="py-5 w-full flex justify-center">
      <div className="w-full max-w-xl">
        <h1 className="text-4xl font-bold font-display mb-2">Hypixel Guild Finder Discord Bot</h1>
        <div className="text-neutral-300">
          <p>The Hypixel Guild Finder Discord bot offers a simple way to get notified when your guild gets a join request.</p>
          <br />
          <p>This bot will send a message in your specified Discord channel when someone requests to join your Hypixel Guild Finder guild.</p>
          <br/>
          <Image src="/assets/discord-bot-screenshot.png" alt="Discord Bot Screenshot" width="500" height="500" className="rounded-lg border-2 overflow-hidden border-neutral-800"/>
          <br />
          <p className="font-bold text-white">Setup is easy:</p>
          <ul className="list-disc list-inside pl-4">
            <li>Click the "Add Bot" button below and add the Discord bot.</li>
            <li>In your desired channel, run the <span className="bg-neutral-800 rounded p-1 font-mono text-sm">/link</span> command.</li>
            <li>Follow the link and press the <span className="text-purple-400 font-bold">Link Now</span> button.</li>
          </ul>
        </div>

        <Link href={process.env.NEXT_PUBLIC_DISCORD_BOT_INSTALL_URL || ""} target="_blank"><Button className="gap-1 mt-5 py-2 h-fit">Add Bot <Plus size={18} /></Button></Link>
      </div>
    </div>
  );
}
