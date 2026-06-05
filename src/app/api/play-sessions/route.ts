import { auth } from "@/auth";
import { prisma } from "@/src/lib/db";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const gameId = request.nextUrl.searchParams.get("gameId");
  if (!gameId) {
    return Response.json({ error: "gameId is required" }, { status: 400 });
  }

  const sessions = await prisma.playSession.findMany({
    where: { userId: session.user.id, gameId },
    include: { players: true },
    orderBy: { playedAt: "desc" },
  });

  return Response.json({ sessions });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { gameId, playedAt, durationMinutes, notes, players } = body as {
    gameId: string;
    playedAt: string;
    durationMinutes?: number | null;
    notes?: string | null;
    players: { name: string; score?: number | null; isWinner?: boolean }[];
  };

  if (!gameId || !playedAt) {
    return Response.json({ error: "gameId and playedAt are required" }, { status: 400 });
  }

  const game = await prisma.game.findUnique({ where: { id: gameId } });
  if (!game) {
    return Response.json({ error: "Game not found" }, { status: 404 });
  }

  const playSession = await prisma.playSession.create({
    data: {
      userId: session.user.id,
      gameId,
      playedAt: new Date(playedAt),
      durationMinutes: durationMinutes ?? null,
      notes: notes ?? null,
      players: {
        create: (players ?? []).map((p) => ({
          name: p.name,
          score: p.score ?? null,
          isWinner: p.isWinner ?? false,
        })),
      },
    },
    include: { players: true },
  });

  return Response.json({ session: playSession }, { status: 201 });
}
