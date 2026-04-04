import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server";
import { getMinecraftProfile, getMinecraftToken, getXBLToken, getXSTSToken } from "./mc_username_functions/functions";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/";
  }
  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    console.log("provider token", data?.session?.provider_token);

    if (!error && data?.session?.provider_token) {
      const msAccessToken = data.session.provider_token;

      const xbl = await getXBLToken(msAccessToken);
      const xsts = await getXSTSToken(xbl.Token);
      const mc = await getMinecraftToken(xsts.Token, xbl.DisplayClaims.xui[0].uhs);
      const profile = await getMinecraftProfile(mc.access_token);

      console.log('Minecraft username:', profile.name);
    }

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }
  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
