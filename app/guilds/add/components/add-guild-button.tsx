"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle, Plus, Search, SearchCheck } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import findUserGuild, { addGuild } from "../../guild-actions";

export default function AddGuildButton() {
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [guild, setGuild] = useState<h_guild | null>(null);
  const [addButtonLoading, setAddButtonLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (dialogOpen) {
      // get users guild
      findUserGuild().then((response) => {
        if (response) setGuild(response);
        setLoading(false);
      });
    }
  }, [dialogOpen]);

  async function addUserGuild(guild: h_guild) {
    setAddButtonLoading(true);
    const response = await addGuild(guild);
    if (response) {
      // Successfully added guild
      window.location.replace("/guilds/verify");
    } else {
      // Error while adding guild
      setError(true);
    }
    setAddButtonLoading(false);
  }

  function dialogContents() {
    if (loading) {
      return (
        <AlertDialogContent className="py-10 w-full flex justify-center">
          <AlertDialogTitle className="hidden">Loading</AlertDialogTitle>
          <LoaderCircle className="animate-spin" />
        </AlertDialogContent>
      );
    } else {
      if (guild) {
        return (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <SearchCheck size={20} />
                Guild Found!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-md">
                Do you want to add your guild,{" "}
                <span className="text-bold text-purple-400">{guild.name}</span>?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="flex gap-1 items-center justify-center min-w-16"
                onClick={() => addUserGuild(guild)}
              >
                {addButtonLoading ? (
                  <LoaderCircle size={15} className="animate-spin" />
                ) : (
                  <>
                    Add Guild <Plus size={15} />
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        );
      } else {
        return (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Could Not Find Guild</AlertDialogTitle>
              <AlertDialogDescription className="text-md">
                <p>
                  Your guild could not be found. This message will show if you
                  are not the <span className="underline">owner</span> of your
                  guild.
                </p>
                <br />
                <p>Guilds can only be added by their owner.</p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDialogOpen(false)}>
                Ok
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        );
      }
    }
  }

  return (
    <>
      <Button
        className="flex gap-2"
        onClick={() => {
          setDialogOpen(true);
          setLoading(true);
        }}
      >
        Find My Guild
        <Search size={15} />
      </Button>

      {error && (
        <p className="text-red-400 text-sm mt-3">
          An error occured while adding your guild. Please try again later or
          contact me for support at{" "}
          <a href="mailto:info@hypixelguildfinder.com" className="underline">
            info@hypixelguildfinder.com
          </a>
          .
        </p>
      )}

      <AlertDialog open={dialogOpen}>{dialogContents()}</AlertDialog>
    </>
  );
}
