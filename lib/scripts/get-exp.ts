import { createClient } from "@/utils/supabase/server";
import axios from "axios";

export async function AddExpToAllGuilds(){
  // Fetch Guild ID
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("guilds")
    .select();

  if(!data) return;

  const allGuilds = data as guild[];

  for await (const guild of allGuilds){
    // Get guild info from Hypixel API
    const guildData = await axios
      .get(
        `https://api.hypixel.net/guild?key=${process.env.HYPIXEL_KEY}&id=${guild.hypixel_id}`
      )
      .then(async (response) => {
        if (response.data.success) {
          if (response.data.guild === null) {
            // Guild has been disbanded
            console.log("guild has been disbanded. ID: ", guild.id);
            await supabase.from("guilds").delete().eq("hypixel_id", guild.id);
            return null;
          }
          return response.data.guild as h_guild;
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
        return null;
      });

    if(!guildData) continue;

    await supabase
    .from("guilds")
    .update({
      exp: guildData.exp,
    })
    .eq("id", guild.id);
  }
}