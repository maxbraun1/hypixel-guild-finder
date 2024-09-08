import ImageWithFallback from "@/components/ui/image-with-fallback";

export default function TopGame({ game }: { game: [string, number] }) {
  const game_image = "/assets/game_icons/" + game[0] + ".png";
  const default_image = "/assets/game_icons/DEFAULT.png";
  return (
    <div className="flex gap-2">
      <ImageWithFallback
        className="rounded overflow-hidden !aspect-square"
        src={game_image}
        fallbackSrc={default_image}
        width={50}
        height={50}
        alt=""
      />
      <div>
        <p>{formatGameName(game[0])}</p>
        <p className="text-purple-500">{numberWithCommas(game[1])} EXP</p>
      </div>
    </div>
  );
}

function formatGameName(gameName: string): string {
  const words = gameName.toLowerCase().split("_");
  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return formattedWords.join(" ");
}

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
