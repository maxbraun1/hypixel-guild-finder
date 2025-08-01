import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import InstructionSteps, { Step } from "@/components/steps/instruction-steps";

export default async function Index() {
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
    <div className="space-y-10 w-full">
      <div className="justify-center w-full h-[calc(100vh-63px)] text-center flex flex-col items-center gap-1 overflow-hidden relative p-5">
        <Image
          src="/assets/background.jpg"
          width={2000}
          height={2000}
          alt=""
          priority
          className="w-full h-full absolute -z-10 top-0 left-0 object-cover blur-md brightness-50 scale-110"
        />
        <h1 className="text-7xl font-black">FIND YOUR GUILD</h1>
        <p className="max-w-xl">
          Find the perfect Hypixel guild for you. Connect with like-minded
          players, explore new adventures, and join a community that fits your
          playstyle!
        </p>
        <div className="flex gap-3 mt-5">
          <Link href="/guilds/search">
            <Button className="text-lg flex gap-1">
              <Search size={20} />
              Search Guilds
            </Button>
          </Link>
          <Link href="/guilds/add">
            <Button
              variant="secondary"
              className="flex gap-1 text-lg text-black bg-white hover:bg-neutral-50"
            >
              <Plus size={20} />
              Add Your Guild
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto !my-0 py-16 space-y-12 px-8">
        <div>
          <h1 className="text-5xl font-black w-full">How to Add Your Guild</h1>
          <div className="w-24 bg-[#a855f7] h-1 mt-4"></div>
        </div>

        <InstructionSteps steps={addGuildSteps} />
      </div>
    </div>
  );
}
