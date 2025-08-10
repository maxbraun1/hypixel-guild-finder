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
  CheckIcon,
  ChevronsUpDownIcon,
  Info,
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
import { Separator } from "@/components/ui/separator";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  return (
    <>
      <Button
        variant="secondary"
        className="flex gap-2"
        onClick={() => setOpen(true)}
      >
        <SlidersHorizontal size={20} /> Search & Filter
      </Button>

      <AlertDialog open={open}>
        <AlertDialogContent className="p-0">
          <AlertDialogHeader className="p-5 pb-0">
            <AlertDialogTitle className="leading-4">
              Filter & Search
            </AlertDialogTitle>
          </AlertDialogHeader>

          <div className="space-y-5 text-left px-5">
            <Input
              className="w-full"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search term..."
            />

            <div className="space-y-1">
              <Label className="w-full block mb-1">Top Played Game</Label>
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
                    className="w-[200px] justify-between"
                  >
                    {topGame
                      ? gameTypes.find((gameType) => gameType.value === topGame)
                          ?.name
                      : "Select game..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
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
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                topGame === gameType.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {gameType.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-1">
              <Label>Guild Size</Label>
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
                  <TooltipContent>
                    <p className="text-xs max-w-sm">
                      This indicates that the owner of this guild has logged
                      into Hypixel within the last 2 weeks, according to the
                      Hypixel API.
                    </p>
                  </TooltipContent>
                </Tooltip>
                <p className="border text-[10px] border-purple-500 text-purple-500 rounded-full py-0.5 px-1">
                  New
                </p>
              </Label>
            </div>
          </div>

          <AlertDialogFooter className="flex p-5 border-t flex-row justify-between sm:justify-between">
            <Link href="/guilds/search">
              <Button variant="outline">Reset Filters</Button>
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
