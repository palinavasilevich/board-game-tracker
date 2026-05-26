import { auth } from "@/auth";
import { prisma } from "@/src/lib/db";
import { getHotGames } from "@/src/shared/api/bgg-api";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = Math.min(Number(searchParams.get("limit") ?? 20), 100);

  const [session, games] = await Promise.all([auth(), getHotGames()]);

  const sorted = [...games]
    .sort((a, b) => {
      if (a.rank === 0) return 1;
      if (b.rank === 0) return -1;
      return a.rank - b.rank;
    })
    .slice(0, limit);

  if (!session?.user?.id) {
    return Response.json(sorted);
  }

  const externalIds = sorted.map((g) => g.id);
  const userGames = await prisma.userGame.findMany({
    where: {
      userId: session.user.id,
      game: { externalId: { in: externalIds } },
    },
    select: {
      userScore: true,
      status: true,
      game: { select: { externalId: true } },
    },
  });

  const userGameMap = new Map(
    userGames.map((userGame) => [userGame.game.externalId, userGame]),
  );

  return Response.json(
    sorted.map((game) => ({
      ...game,
      userScore: userGameMap.get(game.id)?.userScore ?? null,
      userStatus: userGameMap.get(game.id)?.status ?? null,
    })),
  );
}
