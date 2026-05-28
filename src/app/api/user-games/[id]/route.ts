import { auth } from "@/auth";
import { prisma } from "@/src/lib/db";
import { UserGameStatus } from "@/src/lib/generated/prisma/enums";
import { type NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await props.params;
  const body = await request.json();
  const { status, userScore } = body as { status: UserGameStatus; userScore?: number | null };

  if (!status || !Object.values(UserGameStatus).includes(status)) {
    return Response.json({ error: "Invalid status" }, { status: 400 });
  }

  const existing = await prisma.userGame.findUnique({ where: { id } });
  if (!existing || existing.userId !== session.user.id) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const userGame = await prisma.userGame.update({
    where: { id },
    data: { status, ...(userScore !== undefined && { userScore }) },
    include: { game: { include: { genres: { include: { genre: true } } } } },
  });

  return Response.json({ userGame });
}

export async function DELETE(
  _request: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await props.params;

  const existing = await prisma.userGame.findUnique({ where: { id } });
  if (!existing || existing.userId !== session.user.id) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.userGame.delete({ where: { id } });

  return new Response(null, { status: 204 });
}
