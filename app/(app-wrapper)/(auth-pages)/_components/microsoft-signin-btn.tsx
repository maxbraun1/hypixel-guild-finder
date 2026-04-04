"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export function MicrosoftSigninButton({
  signup,
  redirectUrl
}: {
  signup?: boolean | undefined;
  redirectUrl?: string | undefined;
}) {
  const supabase = createClient();

  async function microsoftLogin(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const rootURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const redirectURL = rootURL + `/auth/callback/microsoft${ redirectUrl ? `?next=${encodeURIComponent(redirectUrl)}` : ''}`;

    const {data, error} = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        redirectTo: redirectURL,
        scopes: 'email XboxLive.signin offline_access',
      },
    });

    console.log(data, error);
  }

  return (
    <Button
      onClick={microsoftLogin}
      className="bg-transparent border w-full flex gap-2 hover:bg-neutral-800"
    >
      <Image
        src="/assets/microsoft-icon.png"
        width={20}
        height={20}
        alt="Google logo"
      />
      {signup ? "Sign up" : "Sign in"} with Microsoft
    </Button>
  );
}
