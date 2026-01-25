import { signInAction } from "@/app/(app-wrapper)/actions/auth-actions";
import { FormMessage } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { GoogleSigninButton } from "../_components/google-signin-btn";

export const metadata = {
  title: "Sign In | Hypixel Guild Finder",
  description: "The best way to find a guild on Hypixel!",
};

export default async function Login({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string; redirectUrl?: string }>;
}) {
  const error = (await searchParams)?.error;
  const redirectURL = (await searchParams)?.redirectUrl;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    if (redirectURL) redirect(redirectURL);
    else redirect("/");
  }

  return (
    <form className="flex-1 flex flex-col min-w-64 max-w-sm border p-5 rounded-lg bg-neutral-900">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don't have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>

      <div className="mt-4">
        <GoogleSigninButton redirectUrl={redirectURL}/>
      </div>

      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-4">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        {/* URL to redirect after login */}
        {redirectURL && (
          <input
            type="text"
            defaultValue={redirectURL}
            className="hidden"
            name="redirectURL"
          />
        )}
        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
          Sign in
        </SubmitButton>
        {error && <FormMessage message={{ error }} />}
      </div>
    </form>
  );
}
