import { getGuildInfo } from "@/lib/utils";

export default async function Guild({ guild }: { guild: guild }) {
  const guild_info = await getGuildInfo(guild.id);

  if (!guild_info) {
    return;
  }

  const guild_master_id = guild_info.members.find(
    (member) => member.rank === "Guild Master"
  )?.uuid;

  return (
    <div className="border rounded p-3">
      <p>{guild_info.name}</p>
    </div>
  );
}
