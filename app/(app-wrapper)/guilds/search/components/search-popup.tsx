"use client";
import useQueryParams from "@/utils/useQueryParams";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronsUpDownIcon,
  Info,
  RefreshCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { gameTypes } from "@/lib/game-types";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { Separator } from "@/components/ui/separator";

export default function SearchPopup() {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [guildSize, setGuildSize] = useState<null | string>(null); // 0-20, 21-80, 81+
  const [topGame, setTopGame] = useState<null | string>(null);
  const [topGameSelectorOpen, setTopGameSelectorOpen] = useState(false);
  const [recentlyOnline, setRecentlyOnline] = useState(false);
  const { queryParams, setQueryParams } = useQueryParams();

  useEffect(() => {
    stageForm();
  }, [queryParams]);

  function search() {
    const recentlyOnlineQuery = recentlyOnline ? recentlyOnline : undefined;
    const searchTermQuery = term.length > 0 ? term : undefined;
    setQueryParams({
      term: searchTermQuery,
      topGame,
      guildSize,
      recentlyOnline: recentlyOnlineQuery,
    });
    close();
  }

  function close() {
    setOpen(false);
    stageForm();
  }

  function stageForm() {
    // get values from url and set form values
    setTerm(queryParams.get("term") || "");
    setGuildSize(queryParams.get("guildSize"));
    setTopGame(queryParams.get("topGame"));
    setRecentlyOnline(queryParams.get("recentlyOnline") !== null);
  }

  function searchKeyDown(e: React.KeyboardEvent<HTMLInputElement>){
    if (e.key === "Enter") {
      search();
    }
  }

  return (
    <>
      <Button
        variant="secondary"
        className="flex gap-2 bg-neutral-900/50 border"
        onClick={() => setOpen(true)}
      >
        <SlidersHorizontal size={20} /> Search & Filter
      </Button>

      <AlertDialog open={open}>
        <AlertDialogContent className="p-5 overflow-hidden bg-neutral-900 !rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="leading-4">
              Filter & Search
            </AlertDialogTitle>
          </AlertDialogHeader>

          <div className="text-left p-5 rounded-lg bg-neutral-950/50 max-h-[400px] overflow-y-auto">
            <div className="space-y-2">
              <Label className="w-full block">Search Term</Label>
              <Input
                className="w-full"
                value={term}
                onKeyDown={e => searchKeyDown(e)}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search term..."
              />
            </div>

            <Separator className="my-4"/>

            <div className="space-y-2">
              <Label className="w-full block">Top Played Game</Label>
              <Popover
                open={topGameSelectorOpen}
                onOpenChange={setTopGameSelectorOpen}
                modal={true}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={topGameSelectorOpen}
                    className="w-full justify-between !h-[50px] border"
                  >
                    {topGame
                      ? (<div className="flex gap-2 h-[40px] items-center">
                          <ImageWithFallback src={`/assets/game_icons/${gameTypes.find((gameType) => gameType.value === topGame)
                          ?.name}.png`} fallbackSrc="/assets/game_icons/DEFAULT.png" alt="test" width={40} height={40} className="aspect-square w-[40px] h-[40px]" />
                          <p>{gameTypes.find((gameType) => gameType.value === topGame)
                          ?.name}</p>
                      </div>)
                      : "Select game..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0 cursor-pointer">
                  <Command>
                    <CommandInput placeholder="Search game..." />
                    <CommandList>
                      <CommandEmpty>No game found.</CommandEmpty>
                      <CommandGroup>
                        {gameTypes.map((gameType) => (
                          <CommandItem
                            key={gameType.value}
                            value={gameType.value}
                            onSelect={(currentValue) => {
                              setTopGame(
                                currentValue === topGame ? "" : currentValue
                              );
                              setTopGameSelectorOpen(false);
                            }}
                          >
                            <div className={cn("flex gap-2 h-[40px] items-center w-full cursor-pointer", topGame === gameType.value && "bg-neutral-800")}>
                              <ImageWithFallback src={`/assets/game_icons/${gameType.value}.png`} fallbackSrc="/assets/game_icons/DEFAULT.png" alt="test" width={40} height={40} className="aspect-square w-[40px] h-[40px] rounded overflow-hidden" />
                              <p className="text-lg">{gameType.name}</p>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <Separator className="my-4"/>

            <div className="space-y-2">
              <Label className="w-full block">Guild Size</Label>
              <Select
                value={guildSize || undefined}
                onValueChange={setGuildSize}
              >
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Player Count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">
                    0-20 Members{" "}
                    <span className="text-xs text-neutral-400 ml-2">Small</span>
                  </SelectItem>
                  <SelectItem value="medium">
                    21-80 Members{" "}
                    <span className="text-xs text-neutral-400 ml-2">
                      Medium
                    </span>
                  </SelectItem>
                  <SelectItem value="large">
                    81+ Members{" "}
                    <span className="text-xs text-neutral-400 ml-2">Large</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator className="my-4"/>

            <div className="space-y-1">
              <Label className="flex gap-1.5 items-center">
                <div className="inline-flex items-center">
                  <label className="flex items-center cursor-pointer relative">
                    <input
                      type="checkbox"
                      checked={recentlyOnline}
                      onChange={(event) =>
                        setRecentlyOnline(event.target.checked)
                      }
                      className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-purple-600 checked:border-purple-600"
                    />
                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                </div>
                Recently Online
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Info size={14} />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[250px]">
                    <p className="text-xs max-w-sm">
                      This indicates that the owner of this guild has logged
                      into Hypixel within the last 2 weeks, according to the
                      Hypixel API.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </Label>
            </div>
          </div>

          <AlertDialogFooter className="flex bg-neutral-900/50 flex-row justify-between sm:justify-between">
            <Link href="/guilds/search">
              <Button className="bg-transparent border-none gap-1.5 hover:bg-neutral-950"><RefreshCcw size={18} />Reset</Button>
            </Link>
            <div className="flex gap-2">
              <Button onClick={() => close()} variant="secondary">
                Cancel
              </Button>
              <Button
                className="flex gap-1 items-center"
                onClick={() => search()}
              >
                <Search size={15} />
                Filter
              </Button>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
