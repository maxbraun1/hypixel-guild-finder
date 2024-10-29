"use client";
import { useRequestStore } from "@/app/guilds/search/request-store";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ClipboardCopy } from "lucide-react";

export default function IncomingRequest({ request }: { request: request }) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;

  const date = new Date(request.created_at).toLocaleDateString(
    undefined,
    options
  );
  const { toast } = useToast();

  function copyCommand() {
    navigator.clipboard.writeText("/g invite " + request.username);
    toast({
      description: "Invite command copied to clipboard",
    });
  }

  return (
    <div
      className={cn(
        "border rounded py-2 px-4 flex gap-5",
        request.viewed === false && "bg-neutral-900"
      )}
    >
      <div className="flex-grow">
        <h2 className="font-bold text-lg">{request.username}</h2>
        <p className="text-xs text-neutral-400">{date}</p>
        <p className="pt-3">{request.message}</p>
      </div>
      <div>
        <Button
          className="flex gap-2 text-sm"
          variant="secondary"
          onClick={() => copyCommand()}
        >
          <ClipboardCopy size={20} />
          Copy Invite Command
        </Button>
      </div>
    </div>
  );
}
