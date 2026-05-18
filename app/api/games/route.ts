import { readGamesFromCsv } from "@/lib/games-csv";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const games = readGamesFromCsv();

  const searchParams = request.nextUrl.searchParams;
  const limit = Number(searchParams.get("limit") ?? 20);
  const search = searchParams.get("search") as string | undefined;
  const genres = searchParams.get("genres")?.split(",").filter(Boolean);
  const sortBy = searchParams.get("sortBy");

  let filtered = [...games];

  if (search) {
    filtered = filtered.filter((b) =>
      b.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (genres && genres.length > 0) {
    filtered = filtered.filter((game) =>
      genres.some((genre) => game.genres.includes(genre)),
    );
  }

  if (sortBy) {
    filtered.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);

      if (sortBy === "rank") {
        return Number(a.rank) - Number(b.rank);
      }

      return Number(b.yearPublished) - Number(a.yearPublished);
    });
  }

  const gameList = filtered.slice(0, limit);

  return Response.json(gameList);
}
