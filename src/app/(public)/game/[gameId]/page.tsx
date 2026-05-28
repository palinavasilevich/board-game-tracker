import { auth } from "@/auth";
import { getGameById } from "@/src/shared/api/bgg-api";
import { GameDetailCard } from "@/src/entities/game";
import { prisma } from "@/src/lib/db";
import type { UserGameStatus } from "@/src/lib/generated/prisma/enums";

export default async function GamePage(props: PageProps<"/game/[gameId]">) {
  const { gameId } = await props.params;
  const [session, game] = await Promise.all([auth(), getGameById(gameId)]);

  if (!game) {
    return <div>Game not found...</div>;
  }

  let userScore: number | undefined;
  let status: UserGameStatus | undefined;
  if (session?.user?.id) {
    const dbGame = await prisma.game.findUnique({
      where: { externalId: game.id },
      select: { id: true },
    });
    if (dbGame) {
      const userGame = await prisma.userGame.findUnique({
        where: { userId_gameId: { userId: session.user.id, gameId: dbGame.id } },
        select: { userScore: true, status: true },
      });
      userScore = userGame?.userScore ?? undefined;
      status = userGame?.status ?? undefined;
    }
  }

  return (
    <div className="flex w-full items-center justify-center py-12">
      <GameDetailCard game={game} userScore={userScore} status={status} />
    </div>
  );
}
