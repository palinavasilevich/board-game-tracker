import { GameList } from "@/components/game-list/game-list";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/db";

export default async function Home() {
  const games = await prisma.game.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      metaScore: true,
      genres: {
        take: 1,
        select: { genre: { select: { name: true } } },
      },
    },
  });

  return (
    <div className="w-full">
      <Input
        type="text"
        placeholder="Search games..."
        className="w-full max-w-md mx-auto block px-4 py-2 bg-dark/70 border border-white/10 rounded-lg text-white placeholder:text-gray focus:outline-none focus:border-accent/50 font-serif"
      />
      <GameList games={games} isLoading={false} />
    </div>
  );
}
