import { getHotGames, searchGames } from "@/lib/bgg-api";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = Math.min(Number(searchParams.get("limit") ?? 20), 100);
  const search = searchParams.get("search") ?? undefined;
  const genres = searchParams.get("genres")?.split(",").filter(Boolean);

  const sortBy = searchParams.get("sortBy");
  const playerCount = searchParams.get("playerCount")
    ? Number(searchParams.get("playerCount"))
    : undefined;
  const playTime = searchParams.get("playTime")
    ? Number(searchParams.get("playTime"))
    : undefined;

  let games = search ? await searchGames(search) : await getHotGames();

  if (genres && genres.length > 0) {
    games = games.filter((game) =>
      genres.some((genre) => game.genres.includes(genre)),
    );
  }

  if (playerCount != null) {
    games = games.filter(
      (game) =>
        (game.minPlayers === 0 && game.maxPlayers === 0) ||
        (game.minPlayers <= playerCount && game.maxPlayers >= playerCount),
    );
  }

  if (playTime != null) {
    games = games.filter(
      (game) => game.minPlaytime === 0 || game.minPlaytime <= playTime,
    );
  }

  if (sortBy) {
    games = [...games].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "rank") {
        if (a.rank === 0 || b.rank === 0) {
          return 1;
        }
        return Number(a.rank) - Number(b.rank);
      }
      if (sortBy === "newest")
        return Number(b.yearPublished) - Number(a.yearPublished);
      return 0;
    });
  }

  return Response.json(games.slice(0, limit));
}
