"use client";

import { Button } from "@/components/ui/button";
import { BadgeCheck, ClipboardCopy, LoaderCircle, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import {
  createGuildVerificationCode,
  verifyGuild,
} from "../../../actions/guild-actions";

export default function VerificationButton() {
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState<null | string>(null);
  const [verificationState, setVerificationState] = useState<
    "code" | "complete" | "error"
  >("code");

  async function createCode() {
    setLoading(true);
    const code = await createGuildVerificationCode();
    if (!code) setVerificationState("error");
    setCode(code);
    setVerificationState("code");
    setLoading(false);
  }

  async function verify() {
    setLoading(true);
    const result = await verifyGuild();
    if (result) {
      setVerificationState("complete");
    } else {
      setVerificationState("error");
    }
    setLoading(false);
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button onClick={createCode} className="mt-4 flex gap-1">
            <BadgeCheck size={20} /> Verify Guild
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>{dialogContents()}</AlertDialogContent>
      </AlertDialog>
    </>
  );
  function dialogContents() {
    if (loading) {
      return (
        <AlertDialogContent className="py-10 w-full flex justify-center">
          <AlertDialogTitle className="hidden">Loading</AlertDialogTitle>
          <LoaderCircle className="animate-spin" />
        </AlertDialogContent>
      );
    } else if (verificationState === "code" && code) {
      return (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              Verify Guild
            </AlertDialogTitle>
            Add this code to your{" "}
            <span className="font-bold text-purple-400">guild description</span>{" "}
            using this command:
            <br />
            <span className="bg-black border rounded font-mono p-1.5 my-1 w-fit flex items-center gap-2">
              /g settings description{" "}
              <span className="text-purple-500">{code}</span>
              <ClipboardCopy
                onClick={() => {
                  navigator.clipboard.writeText(
                    "/g settings description " + code
                  );
                }}
                size={20}
                className="cursor-pointer"
              />
            </span>
            <br />
            <br />
            Once you've added the code, click Verify.
            <div className="my-5 bg-black rounded p-3 flex justify-between items-center">
              <p className="text-purple-500 text-4xl font-black tracking-widest">
                {code}
              </p>
              <ClipboardCopy
                onClick={() => {
                  navigator.clipboard.writeText(code);
                }}
                size={30}
                className="cursor-pointer"
              />
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={() => verify()}>Verify</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      );
    } else if (verificationState === "complete") {
      return (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              Guild Verified!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-md">
              Your guild has been successfully verified and is now visible to
              users. You can now{" "}
              <span className="text-purple-500">
                remove your verification code from your guild description
              </span>
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => window.location.replace("/")}>
              Ok!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      );
    } else if (verificationState === "error" && code) {
      return (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-1">
              <X size={20} color="red" />
              Guild Verification Failed
            </AlertDialogTitle>
            <AlertDialogDescription className="text-md">
              <p className="mb-8">
                Something went wrong while verifying your guild. Make sure
                you've added your verification code to your guild description.
              </p>
              Add this code to your{" "}
              <span className="font-bold text-purple-400">
                guild description
              </span>{" "}
              using this command:
              <br />
              <span className="bg-black border rounded font-mono p-1.5 my-1 w-fit flex items-center gap-2">
                /g settings description{" "}
                <span className="text-purple-500">{code}</span>
                <ClipboardCopy
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "/g settings description " + code
                    );
                  }}
                  size={20}
                  className="cursor-pointer"
                />
              </span>
              <br />
              <br />
              Once you've added the code, click Verify.
              <div className="my-5 bg-black rounded p-3 flex justify-between items-center">
                <p className="text-purple-500 text-4xl font-black tracking-widest">
                  {code}
                </p>
                <ClipboardCopy
                  onClick={() => {
                    navigator.clipboard.writeText(code);
                  }}
                  size={30}
                  className="cursor-pointer"
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={() => verify()}>Try Again</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      );
    }
  }
}
