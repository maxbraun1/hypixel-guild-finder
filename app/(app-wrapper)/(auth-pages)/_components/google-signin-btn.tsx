"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export function GoogleSigninButton({
  signup,
  redirectUrl
}: {
  signup?: boolean | undefined;
  redirectUrl?: string | undefined;
}) {
  const supabase = createClient();

  async function googleLogin(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const rootURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const redirectURL = rootURL + `/auth/callback/google${ redirectUrl ? `?next=${encodeURIComponent(redirectUrl)}` : ''}`;

    supabase.auth.signInWithOAuth({
      provider: 'google',
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
