import { auth } from "@/auth";
import { prisma } from "@/src/lib/db";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const q = request.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 2) {
    return Response.json({ users: [] });
  }

  const users = await prisma.user.findMany({
    where: {
      id: { not: session.user.id },
      name: { contains: q, mode: "insensitive" },
    },
    select: { id: true, name: true, avatarUrl: true },
    take: 10,
  });

  const followingIds = new Set(
    (
      await prisma.friendship.findMany({
        where: { followerId: session.user.id },
        select: { followingId: true },
      })
    ).map((f) => f.followingId),
  );

  return Response.json({
    users: users.map((u) => ({
      ...u,
      isFollowing: followingIds.has(u.id),
    })),
  });
}
