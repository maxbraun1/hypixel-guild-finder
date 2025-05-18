import { signInAction } from "@/app/actions/auth-actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign In | Hypixel Guild Finder",
  description: "The best way to find a guild on Hypixel!",
};

type SP = {
  message?: Message;
  redirectURL?: string;
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
    if (redirectURL) redirect("/" + redirectURL);
    else redirect("/");
  }

  return (
    <form className="flex-1 flex flex-col min-w-64 max-w-sm border p-5">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don't have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
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
