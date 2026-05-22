import { getHotGames } from "@/src/shared/api/bgg-api";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = Math.min(Number(searchParams.get("limit") ?? 20), 100);

  const games = await getHotGames();
  const sorted = [...games].sort((a, b) => {
    if (a.rank === 0) return 1;
    if (b.rank === 0) return -1;
    return a.rank - b.rank;
  });

  return Response.json(sorted.slice(0, limit));
}
