import { auth } from "@/auth";
import { prisma } from "@/src/lib/db";
import { UserGameStatus } from "@/src/lib/generated/prisma/enums";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const status = request.nextUrl.searchParams.get("status") as UserGameStatus | null;

  const userGames = await prisma.userGame.findMany({
    where: {
      userId: session.user.id,
      ...(status ? { status } : {}),
    },
    include: {
      game: {
        include: { genres: { include: { genre: true } } },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return Response.json({ userGames });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { gameId, status } = body as { gameId: string; status: UserGameStatus };

  if (!gameId || !status || !Object.values(UserGameStatus).includes(status)) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const game = await prisma.game.findUnique({ where: { id: gameId } });
  if (!game) {
    return Response.json({ error: "Game not found" }, { status: 404 });
  }

  const userGame = await prisma.userGame.upsert({
    where: { userId_gameId: { userId: session.user.id, gameId } },
    create: { userId: session.user.id, gameId, status },
    update: { status },
    include: { game: { include: { genres: { include: { genre: true } } } } },
  });

  return Response.json({ userGame }, { status: 201 });
}
