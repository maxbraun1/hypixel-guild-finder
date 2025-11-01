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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ArrowRight, CircleCheck, LoaderCircle, X } from "lucide-react";
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
  const [buttonState, setButtonState] = useState<
    "submit" | "loading" | "error" | "success"
  >("loading");
  const [mcPicture, setMCPicture] = useState<null | string>(null);
  const { toast } = useToast();
  const mcHeadsURL = "https://mc-heads.net/avatar/";

  useEffect(() => {
    getMCUsername().then((result) => {
      if (result) {
        form.setValue("username", result);
        setMCPicture(mcHeadsURL + result);
        setButtonState("success");
      } else {
        setButtonState("submit");
      }
    });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setButtonState("loading");
    const response = await updateMCUsername(values.username);
    if (response !== null) {
      setButtonState("error");
      setMCPicture(null);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.error,
      });
    } else {
      setButtonState("success");
      setMCPicture(mcHeadsURL + values.username);
      toast({
        description: "Your username has been updated.",
      });
    }
  }

  form.watch(() => {
    setButtonState("submit");
  });

  function submitButton() {
    switch (buttonState) {
      case "submit":
        return (
          <Button type="submit" className="h-12 rounded-none p-3 !m-0">
            <ArrowRight />
          </Button>
        );
      case "loading":
        return (
          <Button type="submit" className="h-12 rounded-none p-3 !m-0">
            <LoaderCircle className="animate-spin" />
          </Button>
        );
      case "error":
        return (
          <Button
            type="submit"
            className="h-12 rounded-none p-3 !m-0 bg-red-500 hover:bg-red-500 cursor-not-allowed"
          >
            <X />
          </Button>
        );
      case "success":
        return (
          <Button
            type="submit"
            className="h-12 rounded-none p-3 !m-0 bg-green-600 hover:bg-green-700"
          >
            <CircleCheck />
          </Button>
        );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-2">
        <FormLabel className="text-lg">Minecraft Username</FormLabel>
        <div className="flex gap-2">
          <Image
            className="rounded overflow-hidden"
            src={mcPicture || "/assets/steve.png"}
            width={48}
            height={48}
            alt=""
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <>
                <FormItem className="flex border w-fit h-12 rounded overflow-hidden gap-1">
                  <FormControl>
                    <div>
                      <Input
                        placeholder="HypixelPlayer123"
                        className="w-full max-w-xs h-12 !m-0 border-0 rounded-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                      {submitButton()}
                    </div>
                  </FormControl>
                </FormItem>
                <FormMessage className="text-white mt-2" />
              </>
            )}
          />
        </div>
      </form>
    </Form>
  );
}