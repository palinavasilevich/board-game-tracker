import { getHotGames } from "@/src/shared/api/bgg-api";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  //   const limit = Math.min(Number(searchParams.get("limit") ?? 20), 100);
  const limit = 20;

  let games = await getHotGames();
  games = [...games].sort((a, b) => {
    if (a.rank === 0 || b.rank === 0) {
      return 1;
    }

    return Number(a.rank) - Number(b.rank);
  });

  return Response.json(games.slice(0, limit));
}
