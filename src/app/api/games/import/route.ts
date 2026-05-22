import { getGameById } from "@/src/shared/api/bgg-api";
import { prisma } from "@/src/lib/db";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const bggId = String(body?.bggId ?? "").trim();

  if (!bggId) {
    return Response.json({ error: "bggId is required" }, { status: 400 });
  }

  const bggGame = await getGameById(bggId);

  if (!bggGame) {
    return Response.json({ error: "Game not found on BGG" }, { status: 404 });
  }

  const game = await prisma.$transaction(async (tx) => {
    const genres = await Promise.all(
      bggGame.genres.map((name) =>
        tx.genre.upsert({
          where: { name },
          update: {},
          create: { name },
        }),
      ),
    );

    return tx.game.upsert({
      where: { externalId: bggId },
      update: {
        name: bggGame.name,
        description: bggGame.description,
        imageUrl: bggGame.thumbnail,
        yearPublished: bggGame.yearPublished,
        rank: bggGame.rank,
        minPlayers: bggGame.minPlayers,
        maxPlayers: bggGame.maxPlayers,
        minPlaytime: bggGame.minPlaytime,
        maxPlaytime: bggGame.maxPlaytime,
        metaScore: bggGame.rating,
        genres: {
          deleteMany: {},
          create: genres.map((g) => ({ genreId: g.id })),
        },
      },
      create: {
        externalId: bggId,
        name: bggGame.name,
        description: bggGame.description,
        imageUrl: bggGame.thumbnail,
        yearPublished: bggGame.yearPublished,
        rank: bggGame.rank,
        minPlayers: bggGame.minPlayers,
        maxPlayers: bggGame.maxPlayers,
        minPlaytime: bggGame.minPlaytime,
        maxPlaytime: bggGame.maxPlaytime,
        metaScore: bggGame.rating,
        genres: {
          create: genres.map((g) => ({ genreId: g.id })),
        },
      },
      include: { genres: { include: { genre: true } } },
    });
  });

  return Response.json(game, { status: 201 });
}
