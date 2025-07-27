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
import { CheckIcon, ChevronsUpDownIcon, SlidersHorizontal } from "lucide-react";
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

export default function SearchPopup() {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [guildSize, setGuildSize] = useState<null | string>(null); // 0-20, 21-80, 81+
  const [topGame, setTopGame] = useState<null | string>(null);
  const [topGameSelectorOpen, setTopGameSelectorOpen] = useState(false);
  const { queryParams, setQueryParams } = useQueryParams();

  useEffect(() => {
    stageForm();
  }, [queryParams]);

  function search() {
    setQueryParams({ term, topGame, guildSize });
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="mb-2">
              Filter & Search
            </AlertDialogTitle>
            <div className="space-y-5 text-left">
              <Input
                className="w-full"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search term..."
              />
              <Separator />
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
                        ? gameTypes.find(
                            (gameType) => gameType.value === topGame
                          )?.name
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
                      <span className="text-xs text-neutral-400 ml-2">
                        Small
                      </span>
                    </SelectItem>
                    <SelectItem value="medium">
                      21-80 Members{" "}
                      <span className="text-xs text-neutral-400 ml-2">
                        Medium
                      </span>
                    </SelectItem>
                    <SelectItem value="large">
                      81+ Members{" "}
                      <span className="text-xs text-neutral-400 ml-2">
                        Large
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row justify-between sm:justify-between">
            <Link href="/guilds/search">
              <Button variant="outline">Reset Filters</Button>
            </Link>
            <div className="flex gap-2">
              <Button onClick={() => close()} variant="secondary">
                Cancel
              </Button>
              <Button onClick={() => search()}>Search</Button>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
