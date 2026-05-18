import { prisma } from "@/lib/db";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const genres = sp.get("genres")?.split(",").filter(Boolean) ?? [];
  const minMetaScore = sp.get("minMetaScore") ? Number(sp.get("minMetaScore")) : undefined;
  const minUserScore = sp.get("minUserScore") ? Number(sp.get("minUserScore")) : undefined;
  const sortBy = sp.get("sortBy") ?? "metaScore";

  const games = await prisma.game.findMany({
    where: {
      ...(genres.length > 0 && {
        genres: { some: { genre: { name: { in: genres } } } },
      }),
      ...(minMetaScore !== undefined && { metaScore: { gte: minMetaScore } }),
      ...(minUserScore !== undefined && { userScore: { gte: minUserScore } }),
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      metaScore: true,
      genres: {
        select: {
          genre: { select: { name: true } },
        },
      },
    },
    orderBy:
      sortBy === "name"
        ? { name: "asc" }
        : sortBy === "userScore"
          ? { userScore: "desc" }
          : sortBy === "newest"
            ? { createdAt: "desc" }
            : { metaScore: "desc" },
    take: 20,
  });

  return Response.json(games);
}
