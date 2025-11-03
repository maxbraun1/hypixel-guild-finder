"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function GuildPageBackButton(){
  const searchParams = useSearchParams();
  
  return (
    <Link
      href={`/guilds/search?${decodeURIComponent(searchParams.get("back") || "")}`}
      className="flex gap-2 rounded bg-neutral-900 hover:bg-neutral-800 w-fit px-3 py-1.5 items-center mb-3"
    >
      <ArrowLeft size={15} />
      <p>Search Guilds</p>
    </Link>
  )
}