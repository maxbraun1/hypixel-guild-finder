import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";

export default async function Index() {
  return (
    <div className="flex-grow justify-center text-center flex flex-col items-center gap-1">
      <Image
        src="/assets/background.jpg"
        width={2000}
        height={2000}
        alt=""
        className="w-full h-full absolute -z-10 top-0 left-0 object-cover blur-lg brightness-50"
      />
      <h1 className="text-7xl font-black">FIND YOUR GUILD</h1>
      <p className="max-w-xl">
        Find the perfect Hypixel guild for you. Connect with like-minded
        players, explore new adventures, and join a community that fits your
        playstyle!
      </p>
      <div className="flex gap-3 mt-5">
        <Link href="/guilds/search">
          <Button className="text-lg flex gap-1">
            <Search size={20} />
            Search Guilds
          </Button>
        </Link>
        <Link href="/guilds/add">
          <Button
            variant="secondary"
            className="flex gap-1 text-lg text-black bg-white hover:bg-neutral-50"
          >
            <Plus size={20} />
            Add Your Guild
          </Button>
        </Link>
      </div>
    </div>
  );
}
