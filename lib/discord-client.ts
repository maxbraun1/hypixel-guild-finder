export async function sendDiscordMessage(
  channelId: string,
  content: string
) {
  try {
    const response = await fetch(
      `https://discord.com/api/v10/channels/${channelId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bot ${process.env.DISCORD_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Discord API error:', error);
      return { success: false, error: 'Failed to send message' };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error sending Discord message:', error);
    return { success: false, error: String(error) };
  }
}

export async function sendDiscordGuildRequestNotification(
  channelId: string,
  userMCUsername: string
) {
  try {
    const response = await fetch(
      `https://discord.com/api/v10/channels/${channelId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bot ${process.env.DISCORD_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [
            {
              title: `New Request to Join Your Guild`,
              description: `**${userMCUsername}** has requested to your your guild.`,
              color: 0x0fa01b,
              timestamp: new Date().toISOString(),
            },
          ],
          components: [
            {
              type: 1, // Action Row
              components: [
                {
                  type: 2, // Button
                  style: 5, // Link button
                  label: "View Your Requests",
                  url: process.env.NEXT_PUBLIC_SITE_URL + `/sign-in?redirectUrl=${encodeURIComponent('/requests/incoming')}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Discord API error:', error);
      return { success: false, error: 'Failed to send embed' };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error sending Discord embed:', error);
    return { success: false, error: String(error) };
  }
}

export async function sendDiscordEmbed(
  channelId: string,
  title: string,
  description: string,
  color: number = 0x5865F2
) {
  try {
    const response = await fetch(
      `https://discord.com/api/v10/channels/${channelId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bot ${process.env.DISCORD_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [
            {
              title,
              description,
              color,
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Discord API error:', error);
      return { success: false, error: 'Failed to send embed' };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error sending Discord embed:', error);
    return { success: false, error: String(error) };
  }
}