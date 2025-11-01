"use client";

import { Separator } from "@/components/ui/separator";

export default function GuildBody({
  description,
  hypixel_description,
}: {
  description: string | null,
  hypixel_description: string,
}) {
  return (
    <div className="bg-neutral-900 rounded-lg px-4 py-3 font-display basis-3/4">
      <div className="space-y-5">
        {description && (
          <div>
            <h2 className="text-xl font-bold text-purple-400">
              Description
            </h2>
            <div
              id="description"
              className="py-5"
              dangerouslySetInnerHTML={{
                __html: description || "No description set...",
              }}
            />
            <Separator />
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold text-purple-400">
            Hypixel Guild Description
          </h2>
          <p className="text-sm mt-2">
            {hypixel_description || "No description added..."}
          </p>
        </div>
      </div>
    </div>
  );
}
