import { auth } from "@/auth";
import { getGameById } from "@/src/shared/api/bgg-api";
import { GameDetailCard } from "@/src/entities/game";
import { prisma } from "@/src/lib/db";
import type { UserGameStatus } from "@/src/lib/generated/prisma/enums";
import {
  LogSessionDialog,
  PlaySessionList,
} from "@/src/features/games/play-sessions";

export default async function GamePage(props: PageProps<"/game/[gameId]">) {
  const { gameId } = await props.params;
  const [session, game] = await Promise.all([auth(), getGameById(gameId)]);

  if (!game) {
    return <div>Game not found...</div>;
  }

  let userScore: number | undefined;
  let status: UserGameStatus | undefined;
  let dbGameId: string | undefined;

  if (session?.user?.id) {
    const dbGame = await prisma.game.findUnique({
      where: { externalId: game.id },
      select: { id: true },
    });
    if (dbGame) {
      dbGameId = dbGame.id;
      const userGame = await prisma.userGame.findUnique({
        where: {
          userId_gameId: { userId: session.user.id, gameId: dbGame.id },
        },
        select: { userScore: true, status: true },
      });
      userScore = userGame?.userScore ?? undefined;
      status = userGame?.status ?? undefined;
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-8 py-12">
      <GameDetailCard
        game={game}
        userScore={userScore}
        status={status}
        user={session?.user}
      />

      {session?.user?.id && dbGameId && (
        <div className="w-full max-w-4xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-semibold tracking-tight uppercase">
              Session History
            </h2>
            <LogSessionDialog gameId={dbGameId} gameName={game.name} />
          </div>
          <PlaySessionList gameId={dbGameId} />
        </div>
      )}
    </div>
  );
}
