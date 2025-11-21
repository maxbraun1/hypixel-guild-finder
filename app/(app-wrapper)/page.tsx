import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, Search } from "lucide-react";
import InstructionSteps, { Step } from "@/components/steps/instruction-steps";
import GuildTile from "./guilds/search/components/guild-tile";
import { fetchAndUpdateGuild, getTopGuilds } from "./actions/guild-actions";
import GuildGrid from "./guilds/search/components/guild-grid";

export default async function Index() {
  const guild = await fetchAndUpdateGuild("66f608f98ea8c99bfca52f42");
  const top3Guilds = await getTopGuilds({limit: 3});

  let findGuildSteps: Step[] = [
    {
      id: 1,
      title: "Browse Guilds",
      description:
        "Explore guilds by filters like Top Played Game, Guild Size, and more.",
      video: "/assets/instruction_steps_content/guild-scroll.mp4",
    },
    {
      id: 2,
      title: "Select a Guild",
      description:
        "Click on a guild to see its description, Discord link, and other details.",
      video: "/assets/instruction_steps_content/select-guild.mp4",
    },
    {
      id: 3,
      title: "Send a Request",
      description: `Hit the <strong>Send Request</strong> button, enter your Minecraft username, and optionally include a message for the guild owner.`,
      video: "/assets/instruction_steps_content/send-request.mp4",
    },
  ];

  let addGuildSteps: Step[] = [
    {
      id: 1,
      title: "Find Your Guild",
      description: `After logging in, go to <strong>My Account</strong> in the menu and enter your Minecraft username. Click <strong>Add Your Guild</strong> in the header, then click <strong>Find My Guild</strong>. Once it's found, click <strong>Add Guild</strong>.`,
      video: "/assets/instruction_steps_content/add-guild.mp4",
    },
    {
      id: 2,
      title: "Verify Your Guild",
      description: `Copy the provided code and paste it into your Hypixel guild description (manually or using the command shown), then click <strong>Verify</strong>.`,
      video: "/assets/instruction_steps_content/verify-guild.mp4",
    },
    {
      id: 3,
      title: "Guild Settings",
      description: `After verification, go to <strong>Guild Settings</strong> in the menu to add your guild description, Discord link, and more.`,
      video: "/assets/instruction_steps_content/guild-settings.mp4",
    },
  ];

  return (
    <div className="space-y-14 w-full font-display py-5 lg:p-0">
      <div className="w-full flex flex-col items-center md:items-start justify-between gap-20 md:gap-10 my-10 bg-neutral-900/50 rounded-xl p-5 sm:p-10 md:flex-row">
        <div className="text-left grow font-display w-full md:max-w-md">
          <h1 className="text-7xl font-black text-center md:text-left">FIND YOUR GUILD</h1>
          <p className="text-neutral-300 text-center md:text-left">
            Find the perfect Hypixel guild for you. Connect with like-minded
            players, explore new adventures, and join a community that fits your
            playstyle!
          </p>
          <div className="flex gap-3 mt-5 w-full justify-center md:justify-start">
            <Link href="/guilds/search">
              <Button className="text-md flex gap-1 uppercase">
                <Search size={20} />
                Search Guilds
              </Button>
            </Link>
            <Link href="/guilds/add">
              <Button
                variant="secondary"
                className="flex gap-1 text-md text-black bg-white hover:bg-neutral-50 uppercase"
              >
                <Plus size={20} />
                Add Your Guild
              </Button>
            </Link>
          </div>
        </div>
        
        { guild && (
          <div className="w-[300px] rounded-lg shadow-[0px_0px_30px_rgba(168,85,247,0.25)] hover:shadow-[0px_0px_30px_rgba(168,85,247,0.3)] transition-all scale-[120%] sm:scale-[120%] lg:scale-[130%]">
            <GuildTile guild={guild}/>
          </div>
        ) }
      </div>
      
      { top3Guilds && (
        <div className="space-y-4">
          <div className="flex gap-5 justify-between items-center">
            <div>
              <h1 className="sm:text-3xl text-xl font-black w-full">Current Top Guilds</h1>
              <p className="text-sm text-neutral-300">Guilds are currently ranked by total guild exp.</p>
            </div>
            <Link href="/guilds/search"><Button variant="outline" className="flex gap-1">View All <ArrowRight size={15}/></Button></Link>
          </div>
          <GuildGrid>
            {top3Guilds.map((guild: guild, idx) => (
              <GuildTile key={`guild-${idx}`} guild={guild} />
            ))}
          </GuildGrid>
        </div>
      )}

      <div className="max-w-7xl mx-auto !my-0 py-16 space-y-5">
        <div>
          <h1 className="sm:text-3xl text-xl font-black w-full">How to Add Your Guild</h1>
          <div className="w-24 bg-[#a855f7] h-1 mt-4"></div>
        </div>

        <InstructionSteps steps={addGuildSteps} />
      </div>
    </div>
  );
}
