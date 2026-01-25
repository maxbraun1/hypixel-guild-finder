import { NextRequest, NextResponse } from "next/server";
import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from 'discord-interactions';

export async function POST(request: NextRequest) {
  const signature = request.headers.get("x-signature-ed25519");
  const timestamp = request.headers.get("x-signature-timestamp");

  if (!signature || !timestamp) {
    return new NextResponse("Bad request signature", { status: 401 });
  }

  const rawBody = await request.text();

  const isValid = await verifyKey(
    rawBody,
    signature,
    timestamp,
    process.env.DISCORD_PUBLIC_APP_KEY!
  );

  if (!isValid) {
    return new NextResponse("Invalid request signature", { status: 401 });
  }

  const body = JSON.parse(rawBody);

  const { type, data } = body;

  if (type === InteractionType.PING) {
    return NextResponse.json({ type: InteractionResponseType.PONG });
  }

  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    // "link" command
    if (name === 'link') {
      console.log("Init command received");
      const guildId = body.guild_id;
      const channelId = body.channel_id;
      const userId = body.member.user.id;

      if (!guildId || !channelId || !userId) {
        return new NextResponse("Invalid data", { status: 401 });
      }

      let baseURL;
      if (process.env.NEXT_PUBLIC_DEV) {
        baseURL = "http://localhost:3000";
      } else {
        baseURL = "https://hypixelguildfinder.com";
      }

      const link = baseURL + `/discord-link?guildid=${guildId}&channelid=${channelId}&userid=${userId}`;

      return NextResponse.json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          embeds: [
            {
              title: "Click Here to Link Your Guild",
              description:
                "Thanks for adding the Hypixel Guild Finder Bot! Click the link above to link this bot to your Hypixel Guild Finder guild.",
              color: 0x9c23eb,
              url: link
            },
          ],
          flags: 64,
        },
      });
    }

    console.error(`unknown command: ${name}`);
    return new NextResponse("unknown command", { status: 400 });
  }

  console.error('unknown interaction type', type);
  return new NextResponse("unknown interaction type", { status: 400 });
}
