import { prisma } from "@/src/lib/db";
import { type NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, avatarUrl: true },
  });

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const games = await prisma.userGame.findMany({
    where: { userId: id },
    include: {
      game: {
        include: { genres: { include: { genre: true } } },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return Response.json({ user, games });
}
