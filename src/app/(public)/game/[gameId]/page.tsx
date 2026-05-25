import { getGameById } from "@/src/shared/api/bgg-api";
import { GameDetailCard } from "@/src/entities/game";
import { prisma } from "@/src/lib/db";

export default async function GamePage(props: PageProps<"/game/[gameId]">) {
  const { gameId } = await props.params;
  const game = await getGameById(gameId);

  if (!game) {
    return <div>Game not found...</div>;
  }

  const dbGame = await prisma.game.findUnique({
    where: { externalId: game.id },
    select: { userScore: true },
  });
  const userScore = dbGame?.userScore ?? undefined;

  return (
    <div className="flex w-full items-center justify-center py-12">
      <GameDetailCard game={{ ...game, userScore }} />
    </div>
  );
}
