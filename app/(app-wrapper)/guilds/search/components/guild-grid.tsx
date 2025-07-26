"use client";

import { cn } from "@/lib/utils";

export default function GuildGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-y-10 md:grid-cols-2 sm:gap-5 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}
