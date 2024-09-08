import { createClient } from "@/utils/supabase/server";
import Guild from "./components/guild";

export default async function Guilds() {
  const supabase = createClient();
  const { data: guilds, error } = await supabase.from("guilds").select();

  if (error) {
    console.log(error);
    return;
  }

  return (
    <>
      <h1 className="text-3xl">Guilds</h1>
      <div className="">
        {guilds.map((guild: guild, idx) => (
          <Guild key={`guild-${idx}`} guild={guild} />
        ))}
      </div>
    </>
  );
}
