"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import useQueryParams from "@/utils/useQueryParams";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GuildTileFooter({ guild }: { guild: guild }) {
  const [user, setUser] = useState<any>(null);
  const { queryParams, setQueryParams } = useQueryParams();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then((user) => {
      setUser(user.data.user);
    });
  }, []);

  return (
    <div className="flex bg-neutral-900 justify-between p-3 items-center">
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
          setQueryParams({ request: guild.id, request_name: guild.name });
        }}
      >
        Request to Join
      </Button>
    </div>
  );
}