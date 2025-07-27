"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export function GoogleSigninButton({
  signup,
}: {
  signup?: boolean | undefined;
}) {
  const supabase = createClient();

  function googleLogin() {
    const rootURL = process.env.NEXT_PUBLIC_DEV
      ? "http://localhost:3000"
      : "https://hypixelguildfinder.com";
    const redirectURL = rootURL + "/auth/callback/google";

    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectURL,
      },
    });
  }

  return (
    <Button
      onClick={googleLogin}
      className="bg-transparent border w-full flex gap-2 hover:bg-neutral-800"
    >
      <Image
        src="/assets/google-icon.webp"
        width={20}
        height={20}
        alt="Google logo"
      />
      {signup ? "Sign up" : "Sign in"} with Google
    </Button>
  );
}
