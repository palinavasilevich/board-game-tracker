import { auth } from "@/auth";
import { prisma } from "@/src/lib/db";
import { getGameById } from "@/src/shared/api/bgg-api";
import { UserGameStatus } from "@/src/lib/generated/prisma/enums";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { externalId, status, userScore } = body as {
    externalId: string;
    status: UserGameStatus;
    userScore?: number;
  };

  if (
    !externalId ||
    !status ||
    !Object.values(UserGameStatus).includes(status)
  ) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  let game = await prisma.game.findUnique({ where: { externalId } });

  if (!game) {
    const bggGame = await getGameById(externalId);
    if (!bggGame) {
      return Response.json({ error: "Game not found on BGG" }, { status: 404 });
    }

    const genreRecords = await Promise.all(
      bggGame.genres.map((name) =>
        prisma.genre.upsert({
          where: { name },
          create: { name },
          update: {},
        }),
      ),
    );

    game = await prisma.game.create({
      data: {
        externalId: bggGame.id,
        name: bggGame.name,
        description: bggGame.description || null,
        imageUrl: bggGame.thumbnail || null,
        yearPublished: bggGame.yearPublished || null,
        rank: bggGame.rank,
        minPlayers: bggGame.minPlayers,
        maxPlayers: bggGame.maxPlayers,
        minPlaytime: bggGame.minPlaytime,
        maxPlaytime: bggGame.maxPlaytime,
        metaScore: bggGame.rating,
        genres: {
          create: genreRecords.map((g) => ({ genreId: g.id })),
        },
      },
    });
  }

  const userGame = await prisma.userGame.upsert({
    where: { userId_gameId: { userId: session.user.id, gameId: game.id } },
    create: { userId: session.user.id, gameId: game.id, status, userScore: userScore ?? null },
    update: { status, userScore: userScore ?? null },
    include: { game: { include: { genres: { include: { genre: true } } } } },
  });

  return Response.json({ userGame }, { status: 201 });
}
