import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { forgotPasswordAction } from "@/app/actions/auth-actions";
import { Separator } from "@/components/ui/separator";

export default function ForgotPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <>
      <form className="flex flex-col w-full gap-2 [&>input]:mb-6 min-w-64 max-w-64">
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
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  );
}
