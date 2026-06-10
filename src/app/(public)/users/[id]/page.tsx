import { auth } from "@/auth";
import { prisma } from "@/src/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FollowButton } from "@/src/features/friends";
import {
  STATUS_LABELS,
  STATUS_BADGE_COLORS,
} from "@/src/entities/game/model/status-config";
import { UserGameStatus } from "@/src/lib/generated/prisma/enums";

export default async function UserProfilePage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const [session, profileUser] = await Promise.all([
    auth(),
    prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, avatarUrl: true },
    }),
  ]);

  if (!profileUser) notFound();

  const isOwnProfile = session?.user?.id === profileUser.id;

  const [theirGames, friendshipId, myOwnedGameIds] = await Promise.all([
    prisma.userGame.findMany({
      where: { userId: id },
      include: { game: true },
      orderBy: { createdAt: "desc" },
    }),
    session?.user?.id && !isOwnProfile
      ? prisma.friendship
          .findUnique({
            where: {
              followerId_followingId: {
                followerId: session.user.id,
                followingId: id,
              },
            },
            select: { id: true },
          })
          .then((f) => f?.id ?? null)
      : Promise.resolve(null),
    session?.user?.id && !isOwnProfile
      ? prisma.userGame
          .findMany({
            where: { userId: session.user.id, status: UserGameStatus.OWNED },
            select: { gameId: true },
          })
          .then((rows) => new Set(rows.map((r) => r.gameId)))
      : Promise.resolve(new Set<string>()),
  ]);

  const theirOwnedGames = theirGames.filter(
    (g) => g.status === UserGameStatus.OWNED,
  );
  const gamesInCommon = theirOwnedGames.filter((g) =>
    myOwnedGameIds.has(g.gameId),
  );

  const byStatus = Object.values(UserGameStatus).reduce<
    Record<string, typeof theirGames>
  >((acc, status) => {
    const filtered = theirGames.filter((g) => g.status === status);
    if (filtered.length > 0) acc[status] = filtered;
    return acc;
  }, {});

  return (
    <div className="flex w-full flex-col items-center gap-8 py-12 max-w-3xl mx-auto">
      {/* Profile header */}
      <div className="flex items-center gap-5 w-full">
        <div className="size-16 shrink-0 rounded-full bg-muted flex items-center justify-center text-2xl font-bold uppercase">
          {profileUser.avatarUrl ? (
            <Image
              src={profileUser.avatarUrl}
              alt={profileUser.name}
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          ) : (
            profileUser.name.charAt(0)
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            {profileUser.name}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {theirGames.length} game{theirGames.length !== 1 ? "s" : ""} in
            collection
          </p>
        </div>
        {session?.user?.id && !isOwnProfile && (
          <FollowButton
            followingId={profileUser.id}
            initialFriendshipId={friendshipId}
          />
        )}
      </div>

      {/* Games in common */}
      {!isOwnProfile && session?.user?.id && gamesInCommon.length > 0 && (
        <section className="w-full">
          <h2 className="font-heading text-lg font-semibold tracking-tight uppercase mb-3">
            {gamesInCommon.length} Game{gamesInCommon.length !== 1 ? "s" : ""}{" "}
            in Common
          </h2>
          <div className="flex flex-col divide-y divide-border rounded-lg border">
            {gamesInCommon.map(({ game }) => (
              <Link
                key={game.id}
                href={`/game/${game.externalId}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-accent/30 transition-colors"
              >
                {game.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={game.imageUrl}
                    alt={game.name}
                    className="size-10 shrink-0 rounded object-cover"
                  />
                )}
                <div className="min-w-0">
                  <p className="font-medium truncate">{game.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {game.yearPublished}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Their full collection */}
      {Object.keys(byStatus).length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          {isOwnProfile
            ? "Your collection is empty."
            : `${profileUser.name} hasn't added any games yet.`}
        </p>
      ) : (
        Object.entries(byStatus).map(([status, games]) => (
          <section key={status} className="w-full">
            <div className="flex items-center gap-2 mb-3">
              <h2 className="font-heading text-lg font-semibold tracking-tight uppercase">
                {STATUS_LABELS[status as UserGameStatus]}
              </h2>
              <span
                className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_BADGE_COLORS[status as UserGameStatus]}`}
              >
                {games.length}
              </span>
            </div>
            <div className="flex flex-col divide-y divide-border rounded-lg border">
              {games.map(({ game, userScore }) => (
                <Link
                  key={game.id}
                  href={`/game/${game.externalId}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-accent/30 transition-colors"
                >
                  {game.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={game.imageUrl}
                      alt={game.name}
                      className="size-10 shrink-0 rounded object-cover"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{game.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {game.yearPublished}
                    </p>
                  </div>
                  {userScore !== null && (
                    <span className="shrink-0 text-xs text-muted-foreground font-medium">
                      ★ {userScore}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
