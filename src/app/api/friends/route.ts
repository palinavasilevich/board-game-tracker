import { auth } from "@/auth";
import { prisma } from "@/src/lib/db";
import { type NextRequest } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [friendships, followers] = await Promise.all([
    prisma.friendship.findMany({
      where: { followerId: session.user.id },
      include: {
        following: { select: { id: true, name: true, avatarUrl: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.friendship.findMany({
      where: { followingId: session.user.id },
      include: {
        follower: { select: { id: true, name: true, avatarUrl: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return Response.json({ friendships, followers });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { followingId } = (await request.json()) as { followingId: string };
  if (!followingId) {
    return Response.json({ error: "followingId is required" }, { status: 400 });
  }

  if (followingId === session.user.id) {
    return Response.json({ error: "Cannot follow yourself" }, { status: 400 });
  }

  const target = await prisma.user.findUnique({ where: { id: followingId } });
  if (!target) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const friendship = await prisma.friendship.upsert({
    where: {
      followerId_followingId: {
        followerId: session.user.id,
        followingId,
      },
    },
    create: { followerId: session.user.id, followingId },
    update: {},
    include: {
      following: { select: { id: true, name: true, avatarUrl: true } },
    },
  });

  return Response.json({ friendship }, { status: 201 });
}
