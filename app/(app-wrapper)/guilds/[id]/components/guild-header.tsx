"use client";
import { wasWithinLast14Days } from "@/lib/utils";
import GuildRequestBtn from "./request-btn";
import Image from "next/image";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Info } from "lucide-react";

export default function GuildHeader({
  guild_id,
  guild_name,
}: {
  guild_id: string;
  guild_name: string;
}) {
  return (
    <div className="rounded-lg pt-2 flex flex-col justify-between items-start sm:flex-row font-display">
      <div className="mb-2 items-center">
        <h1 className="text-4xl font-bold w-full">{guild_name}</h1>
      </div>
      <GuildRequestBtn guild_id={guild_id} guild_name={guild_name} />
    </div>
  );
}
