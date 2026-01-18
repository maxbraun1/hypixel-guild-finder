"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Check, LoaderCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getMCUsername,
  updateMCUsername,
} from "@/app/(app-wrapper)/actions/account-actions";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  username: z
    .string()
    .min(3, "Minecraft usernames must be at least 3 characters.")
    .max(16, "Minecraft usernames cannot be more than 16 characters.")
    .regex(
      new RegExp("^[a-zA-Z0-9_]*$"),
      "Minecraft usernames may only contain letters, numbers, and underscores(_)."
    ),
});

export default function MCUsernameForm() {
  const [loading, setLoading] = useState<boolean>(true);
  const [mcPicture, setMCPicture] = useState<null | string>(null);
  const { toast } = useToast();
  const mcHeadsURL = "https://mc-heads.net/avatar/";

  useEffect(() => {
    getMCUsername().then((result) => {
      if (result) {
        form.setValue("username", result);
        setMCPicture(mcHeadsURL + result);
      }
      setLoading(false);
    });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const response = await updateMCUsername(values.username);
    if (response !== null) {
      setMCPicture(null);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.error,
      });
    } else {
      setMCPicture(mcHeadsURL + values.username);
      toast({
        description: "Your username has been saved.",
      });
    }
    setLoading(false);
  }

  return (
    <div className="mt-5">
      <p>Minecraft Username</p>
      <div className="mt-4 flex items-start gap-5">
        <Image
          className="rounded overflow-hidden"
          src={mcPicture || "/assets/steve.png"}
          width={60}
          height={60}
          alt=""
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <>
                  <FormItem className="flex w-fit overflow-hidden gap-1">
                    <FormControl>
                      <div className="flex bg-neutral-800 p-2 pl-0 items-stretch rounded-lg overflow-hidden">
                        <Input
                          placeholder="HypixelPlayer123"
                          className="w-full max-w-xs !m-0 border-0 h-8 bg-transparent rounded-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                        />
                        <Button className="w-20 h-8 px-2.5 bg-purple-600 hover:bg-purple-700">{ loading ? <LoaderCircle className="animate-spin" size={15}/> : "Save" }</Button>
                      </div>
                    </FormControl>
                  </FormItem>
                  <FormMessage className="text-white mt-2" />
                </>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}