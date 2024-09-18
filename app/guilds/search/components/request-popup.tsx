"use client";
import useQueryParams from "@/utils/useQueryParams";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, SendHorizonal } from "lucide-react";
import { sendRequest } from "@/app/actions/account-actions";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  username: z
    .string()
    .min(3, "Minecraft usernames must be at least 3 characters.")
    .max(16, "Minecraft usernames cannot be more than 16 characters.")
    .regex(
      new RegExp("^[a-zA-Z0-9_]*$"),
      "Minecraft usernames may only contain letters, numbers, and underscores(_)."
    ),
  message: z
    .string()
    .max(1000, "Message cannot have more than 1000 characters."),
});

export default function RequestPopup() {
  const [open, setOpen] = useState(false);
  const [requestGuildID, setRequestGuildId] = useState<null | string>(null);
  const [requestGuildName, setRequestGuildName] = useState<null | string>(null);
  const { queryParams, setQueryParams } = useQueryParams();
  const [sendButtonLoading, setSendButtonLoading] = useState(false);

  useEffect(() => {
    if (queryParams.get("request") && queryParams.get("request_name")) {
      setRequestGuildId(queryParams.get("request"));
      setRequestGuildName(queryParams.get("request_name"));
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [queryParams]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSendButtonLoading(true);
    if (requestGuildID) {
      sendRequest(values.username, values.message, requestGuildID).then(
        (response) => {
          setSendButtonLoading(false);
          if (response) {
            // success
            form.reset();
            setQueryParams({
              request: undefined,
              request_name: undefined,
            });
            toast({
              description: "Your request has been sent!",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description:
                "There was a problem sending your request. Please try again later.",
            });
          }
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem sending your request. Please try again later.",
      });
    }
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-2">
            Send Request to {requestGuildName}
          </AlertDialogTitle>
          <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-white">
                      Minecraft Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-white !mt-1"
                        placeholder="Minecraft123"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-white">
                      Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="text-white !mt-1"
                        placeholder="Hello, I'd like to join your guild!"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 items-center w-full justify-end">
                <AlertDialogCancel
                  onClick={() => {
                    form.reset();
                    setQueryParams({
                      request: undefined,
                      request_name: undefined,
                    });
                  }}
                >
                  Cancel
                </AlertDialogCancel>
                <Button className="flex gap-2 items-center">
                  Send Request{" "}
                  {sendButtonLoading ? (
                    <LoaderCircle size={20} className="animate-spin" />
                  ) : (
                    <SendHorizonal size={20} />
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </AlertDialogHeader>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
