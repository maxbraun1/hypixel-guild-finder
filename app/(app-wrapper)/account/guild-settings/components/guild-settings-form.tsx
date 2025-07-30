"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import TextEditor from "./text-editor";
import { setGuildSettings } from "@/app/(app-wrapper)/actions/account-actions";
import { useToast } from "@/hooks/use-toast";
import { Check, LoaderCircle } from "lucide-react";

const formSchema = z.object({
  description: z
    .string()
    .max(10000, "Description cannot be more than 10,000 characters")
    .optional()
    .or(z.literal("")),
  discord_link: z
    .string()
    .regex(
      new RegExp(
        "(?:https?://)?discord(?:(?:app)?.com/invite|.gg)/?[a-zA-Z0-9]+/?"
      ),
      "Discord link should be formatted as: https://discord.gg/abcdeABCDE"
    )
    .optional()
    .or(z.literal("")),
  hypixel_forum_link: z
    .string()
    .regex(
      new RegExp("^https://hypixel.net/threads/.*"),
      'Hypixel Forums link must start with "https://hypixel.net/forums/"'
    )
    .optional()
    .or(z.literal("")),
});

export default function GuildSettingsForm({
  current_values,
}: {
  current_values: guild_settings | null;
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: current_values?.description || "",
      discord_link: current_values?.discord_link || "",
      hypixel_forum_link: current_values?.hypixel_forum_link || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const result = await setGuildSettings(values);
    setLoading(false);
    if (result) {
      toast({
        description: "Guild settings updated.",
      });
    } else {
      toast({
        variant: "destructive",
        description:
          "There was an error while updating your guild settings. Please try again later.",
      });
    }
  }

  form.watch(() => {
    setUpdated(true);
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg !text-white">
                Guild Description
              </FormLabel>
              <FormDescription className="!m-0">
                Describe your guild: games played, requirements, hopes and
                dreams, etc.
              </FormDescription>
              <FormControl>
                <TextEditor
                  set={field.onChange}
                  defaultValue={current_values?.description || undefined}
                />
              </FormControl>
              <FormMessage className="text-red-400 mt-2" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discord_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg !text-white">
                Discord Link
              </FormLabel>
              <FormDescription className="!m-0">
                Invite link to your guilds Discord server.
              </FormDescription>
              <FormControl>
                <Input
                  placeholder="https://discord.gg/abcdeABCDE"
                  {...field}
                  className="w-full max-w-sm"
                />
              </FormControl>
              <FormMessage className="text-red-400 mt-2" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hypixel_forum_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg !text-white">
                Hypixel Forum Link
              </FormLabel>
              <FormDescription className="!m-0">
                A link to your guild post on the official Hypixel Forums
              </FormDescription>
              <FormControl>
                <Input
                  placeholder="https://hypixel.net/threads/join-my-guild.1234567"
                  {...field}
                  className="w-full max-w-sm"
                />
              </FormControl>
              <FormMessage className="text-red-400 mt-2" />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!updated} className="flex gap-2">
          Save Settings{" "}
          {loading ? (
            <LoaderCircle className="animate-spin" size={18} />
          ) : (
            <Check size={18} />
          )}
        </Button>
      </form>
    </Form>
  );
}
