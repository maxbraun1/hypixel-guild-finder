import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { forgotPasswordAction } from "@/app/(app-wrapper)/actions/auth-actions";

export const metadata = {
  title: "Forgot Password | Hypixel Guild Finder",
  description: "The best way to find a guild on Hypixel!",
};

export default async function ForgotPassword({
  searchParams,
}: {
  searchParams: Promise<Message>;
}) {
  const message = await searchParams;

  return (
    <>
      <form className="flex flex-col w-full gap-2 [&>input]:mb-6 min-w-64 max-w-sm border p-5">
        <div>
          <h1 className="text-2xl font-medium">Reset Password</h1>
          <p className="text-sm">
            Already have an account?{" "}
            <Link className="text-primary underline" href="/sign-in">
              Sign in
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-5">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <SubmitButton formAction={forgotPasswordAction}>
            Reset Password
          </SubmitButton>
          <FormMessage message={message} />
        </div>
      </form>
    </>
  );
}
