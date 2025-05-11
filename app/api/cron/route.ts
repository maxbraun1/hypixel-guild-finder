import { sendRequestReminderEmails } from "@/app/actions/guild-actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("running cron job");
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const response = await sendRequestReminderEmails();

  if (response)
    return NextResponse.json({
      message:
        "Cron Job Ran at " +
        new Date() +
        ". Attempted to send emails to " +
        response +
        " guild owners.",
    });

  return NextResponse.json({
    message: "Cron Job Ran at " + new Date() + " but failed.",
  });
}
