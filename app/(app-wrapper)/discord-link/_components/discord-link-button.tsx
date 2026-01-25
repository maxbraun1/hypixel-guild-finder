"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Check, CircleCheck, Link2, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { addGuildDiscordLink } from "../../actions/guild-actions";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

type Props = {
  discordGuildId: string,
  discordGuildName: string | null,
  discordChannelId: string,
  discordUserId: string,
}

export default function DiscordLinkButton(props: Props) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [success, setSuccess] = useState(false);

  async function link(){
    setLoading(true);

    const linkData = {
      discordGuildId: props.discordGuildId,
      discordChannelId: props.discordChannelId,
      discordUserId: props.discordUserId
    }

    const { success, error } = await addGuildDiscordLink(linkData);

    if(!success && error) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error,
      });
      setLoading(false);
      return;
    }

    setSuccess(true);

    toast({
      title: "Your guild has been successfully linked!"
    });

    setLoading(false);
  }

  if(success){
    return (
      <div className="w-full flex justify-center py-10 px-5">
        <div className="bg-neutral-800 text-center w-full max-w-sm p-6 rounded-xl">
          <div className="w-full flex justify-center mb-5">
            <CircleCheck size={100} className="text-green-500" />
          </div>
          <h1 className="text-3xl font-display font-bold">Guild Linked!</h1>
          <p className="text-sm text-neutral-400">Your Hypixel Guild Finder guild has been successfully linked!</p>
          <Link href="/"><Button className="w-full mt-5 gap-1">Back To Homepage</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center py-10 px-5">
      <div className="bg-neutral-800 text-center w-full max-w-sm p-6 rounded-xl">
        <h1 className="text-3xl font-display font-bold">Link <span className="text-purple-400">{props.discordGuildName || "Discord Server" }</span>?</h1>
        <p className="text-sm text-neutral-400">Linking your guild to Discord allows you to receive updates when a user requests to join your guild!</p>
        <div className="flex gap-5 justify-between mt-5">
          <div className="bg-neutral-900 rounded-lg p-5 aspect-square">
            <Image src="/assets/discord-icon.webp" alt="Discord Icon" width={100} height={100} />
          </div>
          <div className="basis-1/3 flex items-center justify-center text-neutral-400"><Link2 size={50}/></div>
          <div className="bg-neutral-900 rounded-lg p-5 aspect-square">
            <Image src="/assets/logo-icon.png" alt="Discord Icon" width={100} height={100} />
          </div>
        </div>
        <Button className="w-full mt-5 gap-1" onClick={link}>{ loading ? <LoaderCircle size={18} className="animate-spin" /> : <><span>Link Now</span><Check size={18} /></>}</Button>
      </div>
    </div>
  );
}