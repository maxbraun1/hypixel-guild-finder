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
import { ArrowRight, LoaderCircle, Save, Sparkle, Star } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

const formSchema = z.object({
  accepting_members: z.boolean().default(true),
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
      accepting_members: current_values?.accepting_members,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="divide-y">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="py-4">
              <FormLabel className="text-base">
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
            <FormItem className="flex flex-col md:flex-row gap-2 items-start py-4">
              <div className="grow">
                <FormLabel className="text-base">
                  Discord Link
                </FormLabel>
                <FormDescription className="!m-0">
                  Invite link to your guilds Discord server.
                </FormDescription>
              </div>
              
              <FormControl>
                <Input
                  placeholder="https://discord.gg/abcdeABCDE"
                  {...field}
                  className="w-full md:max-w-sm !mt-0 bg-neutral-900"
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
            <FormItem className="flex flex-col md:flex-row gap-2 items-start py-4">
              <div className="grow">
                <FormLabel className="text-base">
                  Hypixel Forum Link
                </FormLabel>
                <FormDescription className="!m-0">
                  A link to your guild post on the official Hypixel Forums
                </FormDescription>
              </div>
              <FormControl>
                <Input
                  placeholder="https://hypixel.net/threads/join-my-guild.1234567"
                  {...field}
                  className="w-full md:max-w-sm !mt-0 bg-neutral-900"
                />
              </FormControl>
              <FormMessage className="text-red-400 mt-2" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accepting_members"
          render={({ field }) => (
            <FormItem className="flex gap-2 items-start py-4">
              <div className="grow">
                <FormLabel className="text-base">
                  Accepting Members
                </FormLabel>
                <FormDescription className="!m-0">
                  Uncheck this to hide your guild from users.
                </FormDescription>
              </div>
              <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-purple-400 data-[state=unchecked]:bg-neutral-400"
                  />
                  </FormControl>
              <FormMessage className="text-red-400 mt-2" />
            </FormItem>
          )}
        />

        <div className="bg-neutral-900 rounded-lg p-5 border-none">
          <h3 className="text-2xl font-display font-bold flex gap-1.5 items-center">Get Notified on Discord<span className="bg-purple-600 text-white text-sm px-1 rounded w-fit flex gap-1 items-center">New</span></h3>
          <p className="text-neutral-400 mb-2">Get notified in your Discord server when players request to join your guild through Hypixel Guild Finder.</p>
          <Link href="/discord-bot"><Button className="border-2 border-purple-500 gap-1 bg-neutral-900 hover:bg-purple-500 transition-all">Learn More <ArrowRight size={20}/></Button></Link>
        </div>

        <Button type="submit" disabled={!updated} className="flex gap-2 mt-4">
          Save Settings
          {loading && <LoaderCircle className="animate-spin" size={18} />}
        </Button>
      </form>
    </Form>
  );
}
