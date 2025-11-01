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
  owner_last_login,
}: {
  guild_id: string;
  guild_name: string;
  owner_last_login: string;
}) {
  return (
    <div className="rounded-lg pt-2 flex justify-between items-start font-display">
      <div className="mb-2 items-center">
        <h1 className="text-4xl font-bold w-full">{guild_name}</h1>
        <div>
          {wasWithinLast14Days(Number(owner_last_login)) && (
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <p className="bg-amber-500 w-fit px-1 rounded text-xs mt-1.5 py-0.5 flex gap-0.5 items-center">
                  Online Recently <Info size={11} />
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-sm">
                  This badge indicates that the owner of this guild has logged
                  into Hypixel within the last 2 weeks, according to the Hypixel
                  API.
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
      <GuildRequestBtn guild_id={guild_id} guild_name={guild_name} />
    </div>
  );
}
