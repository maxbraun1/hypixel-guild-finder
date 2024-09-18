import ImageWithFallback from "@/components/ui/image-with-fallback";
import { formatGameName, numberWithCommas } from "@/lib/utils";

export default function TopGameSmall({
  game,
}: {
  game: { name: string; exp: number };
}) {
  const game_image = "/assets/game_icons/" + game.name + ".png";
  const default_image = "/assets/game_icons/DEFAULT.png";
  return (
    <div className="flex gap-2 w-full items-center">
      <ImageWithFallback
        className="rounded overflow-hidden aspect-square"
        src={game_image}
        fallbackSrc={default_image}
        width={35}
        height={35}
        alt=""
      />
      <div>
        <p className="text-sm">{formatGameName(game.name)}</p>
        <p className="text-purple-500 text-sm">
          {numberWithCommas(game.exp)} EXP
        </p>
      </div>
    </div>
  );
}
