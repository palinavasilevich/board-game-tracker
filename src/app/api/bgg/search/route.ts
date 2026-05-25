import { searchGames } from "@/src/shared/api/bgg-api";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (!q) return Response.json({ games: [] });

  try {
    const games = await searchGames(q);
    return Response.json({ games });
  } catch {
    return Response.json({ games: [] });
  }
}
