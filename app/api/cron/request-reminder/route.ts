import { updateGuildActivity } from "@/app/(app-wrapper)/actions/guild-actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("Running guild activity cron job");
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const response = await updateGuildActivity();

  if (response)
    return NextResponse.json({
      message: "Cron Job Ran at " + new Date() + ".",
    });

  return NextResponse.json({
    message: "Cron Job Failed at " + new Date() + ".",
  });
}
