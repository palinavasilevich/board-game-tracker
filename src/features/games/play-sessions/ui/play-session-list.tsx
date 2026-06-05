"use client";

import { ClockIcon, Loader2Icon, Trash2Icon, CrownIcon } from "lucide-react";
import { toast } from "sonner";
import { usePlaySessions } from "../lib/use-play-sessions";
import { useDeleteSession } from "../lib/use-delete-session";

type Props = {
  gameId: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PlaySessionList({ gameId }: Props) {
  const { sessions, isLoading } = usePlaySessions(gameId);
  const {
    mutate: remove,
    isPending: isDeleting,
    variables: deletingId,
  } = useDeleteSession(gameId);

  function handleDelete(id: string) {
    remove(id, {
      onSuccess: () => toast.success("Session removed"),
      onError: () => toast.error("Failed to remove session"),
    });
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">
        No sessions logged yet. Click <b>Log Session</b> to record your first
        play!
      </p>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-border">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="flex items-start justify-between gap-4 py-4"
        >
          <div className="flex flex-col gap-1.5 min-w-0">
            <div className="flex items-center gap-3 text-sm font-semibold">
              <span>{formatDate(session.playedAt)}</span>
              {session.durationMinutes && (
                <span className="flex items-center gap-1 text-muted-foreground font-normal">
                  <ClockIcon className="size-3.5" />
                  {session.durationMinutes} min
                </span>
              )}
            </div>

            {session.players.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {session.players.map((player) => (
                  <span
                    key={player.id}
                    className="flex items-center gap-1 rounded-md bg-accent/50 px-2 py-0.5 text-xs font-medium"
                  >
                    {player.isWinner && (
                      <CrownIcon
                        className="size-3 text-amber-500"
                        fill="currentColor"
                        strokeWidth={0}
                      />
                    )}
                    {player.name}
                    {player.score !== null && (
                      <span className="text-muted-foreground ml-0.5">
                        ({player.score})
                      </span>
                    )}
                  </span>
                ))}
              </div>
            )}

            {session.notes && (
              <p className="text-xs text-muted-foreground italic">
                {session.notes}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleDelete(session.id)}
            disabled={isDeleting && deletingId === session.id}
            className="shrink-0 flex items-center justify-center size-7 rounded-lg text-muted-foreground hover:text-destructive transition-colors disabled:opacity-40"
          >
            {isDeleting && deletingId === session.id ? (
              <Loader2Icon className="size-3.5 animate-spin" />
            ) : (
              <Trash2Icon className="size-3.5" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
