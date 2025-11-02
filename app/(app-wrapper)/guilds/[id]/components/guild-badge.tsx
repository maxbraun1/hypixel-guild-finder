import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export default function GuildBadge({
  name,
  description,
  icon,
  color
} : {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}){
  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <div className="bg-neutral-950/50 w-full p-1 rounded-md text-center gap-1 flex flex-col items-center aspect-square justify-center select-none">
          <div className={color}>{icon}</div>
          <p className="text-sm">{name}</p>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs max-w-sm">{description}</p>
      </TooltipContent>
    </Tooltip>
  )
}