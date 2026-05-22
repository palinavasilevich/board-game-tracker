import { prisma } from "@/src/lib/db";
import { Prisma } from "@/src/lib/generated/prisma/client";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = Math.min(Number(searchParams.get("limit") ?? 20), 100);
  const offset = Math.max(Number(searchParams.get("offset") ?? 0), 0);
  const search = searchParams.get("search") ?? undefined;
  const genres = searchParams.get("genres")?.split(",").filter(Boolean);
  const sortBy = searchParams.get("sortBy");
  const playerCount = searchParams.get("playerCount")
    ? Number(searchParams.get("playerCount"))
    : undefined;
  const playTime = searchParams.get("playTime")
    ? Number(searchParams.get("playTime"))
    : undefined;

  const AND: Prisma.GameWhereInput[] = [];

  if (search) {
    AND.push({ name: { contains: search, mode: "insensitive" } });
  }

  if (genres && genres.length > 0) {
    AND.push({ genres: { some: { genre: { name: { in: genres } } } } });
  }

  if (playerCount != null) {
    AND.push({
      OR: [
        { minPlayers: 0, maxPlayers: 0 },
        { minPlayers: { lte: playerCount }, maxPlayers: { gte: playerCount } },
      ],
    });
  }

  if (playTime != null) {
    AND.push({
      OR: [{ minPlaytime: 0 }, { minPlaytime: { lte: playTime } }],
    });
  }

  const where: Prisma.GameWhereInput = AND.length > 0 ? { AND } : {};

  const orderBy: Prisma.GameOrderByWithRelationInput = (() => {
    if (sortBy === "name") return { name: "asc" };
    if (sortBy === "rank") return { rank: "asc" };
    if (sortBy === "newest") return { yearPublished: "desc" };
    return { createdAt: "desc" };
  })();

  const [games, total] = await Promise.all([
    prisma.game.findMany({
      where,
      orderBy,
      skip: offset,
      take: limit,
      include: { genres: { include: { genre: true } } },
    }),
    prisma.game.count({ where }),
  ]);

  return Response.json({ games, total });
}
