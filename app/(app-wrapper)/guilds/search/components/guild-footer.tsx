"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import RequestPopup from "./request-popup";
import { useState } from "react";

export default function GuildTileFooter({ guild }: { guild: guild }) {
  const [requestOpen, setRequestOpen] = useState(false);

  return (
    <>
      <RequestPopup guild_id={guild.id} guild_name={guild.name} open={requestOpen} setOpen={setRequestOpen}/>
      <div className="flex justify-between p-3 items-center">
      <div className="flex gap-3 items-center">
        <Image
          className="rounded overflow-hidden"
          src={`https://mc-heads.net/avatar/${guild.owner_username}`}
          width={30}
          height={30}
          alt={guild.owner_username}
        />
        <div className="text-sm leading-4">
          <p>{guild.owner_username}</p>
          <p className="text-neutral-400">Owner</p>
        </div>
      </div>
      <Button
        variant="secondary"
        className="text-xs p-2 h-auto"
        onClick={(e) => {
          e.preventDefault();
          setRequestOpen(true);
        }}
      >
        Request to Join
      </Button>
    </div>
    </>
  );
}
