import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getGuildInfo(id: string) {
  // Get guild info from Hypixel API
  return await axios
    .get(
      `https://api.hypixel.net/guild?key=${process.env.HYPIXEL_KEY}&id=${id}`
    )
    .then((response) => {
      if (response.data.success) {
        return response.data.guild as h_guild;
      } else return null;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}

export async function UUIDtoUsername(uuid: string) {
  return await axios
    .get(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)
    .then((response) => {
      return response.data.name;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}

export async function getGuildMaster(guild: h_guild) {
  const owner_uuid = guild.members.find(
    (member) => member.rank === "Guild Master"
  )?.uuid;
  if (!owner_uuid) return null;
  return await UUIDtoUsername(owner_uuid);
}

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatGameName(gameName: string): string {
  const words = gameName.toLowerCase().split("_");
  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return formattedWords.join(" ");
}

export function wasWithinLast14Days(unixTimestamp: number) {
  if (!unixTimestamp) return;
  const now = Date.now();
  const sevenDaysAgo = now - 14 * 24 * 60 * 60 * 1000;

  return unixTimestamp >= sevenDaysAgo && unixTimestamp <= now;
}
