"use client";

import { useState } from "react";
import { PlusIcon, Loader2Icon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";
import { useLogSession } from "../lib/use-log-session";

type PlayerRow = {
  name: string;
  score: string;
  isWinner: boolean;
};

function toLocalDatetimeValue(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

type Props = {
  gameId: string;
  gameName: string;
};

export function LogSessionDialog({ gameId, gameName }: Props) {
  const [open, setOpen] = useState(false);
  const [playedAt, setPlayedAt] = useState(toLocalDatetimeValue(new Date()));
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [players, setPlayers] = useState<PlayerRow[]>([
    { name: "", score: "", isWinner: false },
    { name: "", score: "", isWinner: false },
  ]);

  const { mutate: log, isPending } = useLogSession(gameId);

  function reset() {
    setPlayedAt(toLocalDatetimeValue(new Date()));
    setDuration("");
    setNotes("");
    setPlayers([
      { name: "", score: "", isWinner: false },
      { name: "", score: "", isWinner: false },
    ]);
  }

  function handleOpenChange(val: boolean) {
    if (!val) reset();
    setOpen(val);
  }

  function addPlayer() {
    setPlayers((prev) => [...prev, { name: "", score: "", isWinner: false }]);
  }

  function removePlayer(index: number) {
    setPlayers((prev) => prev.filter((_, i) => i !== index));
  }

  function updatePlayer(index: number, field: keyof PlayerRow, value: string | boolean) {
    setPlayers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
    );
  }

  function handleSubmit() {
    const validPlayers = players
      .filter((p) => p.name.trim())
      .map((p) => ({
        name: p.name.trim(),
        score: p.score !== "" ? Number(p.score) : null,
        isWinner: p.isWinner,
      }));

    log(
      {
        gameId,
        playedAt: new Date(playedAt).toISOString(),
        durationMinutes: duration !== "" ? Number(duration) : null,
        notes: notes.trim() || null,
        players: validPlayers,
      },
      {
        onSuccess: () => {
          toast.success("Session logged!");
          handleOpenChange(false);
        },
        onError: () => toast.error("Failed to log session"),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <PlusIcon className="size-4" />
          Log Session
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Log Session</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-1">
          <div className="truncate rounded-md border bg-accent/30 px-3 py-2 text-sm font-medium">
            {gameName}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Date & Time
              </label>
              <Input
                type="datetime-local"
                value={playedAt}
                onChange={(e) => setPlayedAt(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Duration (min)
              </label>
              <Input
                type="number"
                min={1}
                placeholder="e.g. 90"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Notes
            </label>
            <textarea
              rows={2}
              placeholder="Any notes about this session..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Players
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 gap-1 text-xs"
                onClick={addPlayer}
              >
                <PlusIcon className="size-3" />
                Add
              </Button>
            </div>

            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-[1fr_80px_56px_28px] gap-2 px-1">
                <span className="text-xs text-muted-foreground">Name</span>
                <span className="text-xs text-muted-foreground">Score</span>
                <span className="text-xs text-muted-foreground text-center">Won</span>
                <span />
              </div>
              {players.map((player, index) => (
                <div key={index} className="grid grid-cols-[1fr_80px_56px_28px] gap-2 items-center">
                  <Input
                    placeholder={`Player ${index + 1}`}
                    value={player.name}
                    onChange={(e) => updatePlayer(index, "name", e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="—"
                    value={player.score}
                    onChange={(e) => updatePlayer(index, "score", e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => updatePlayer(index, "isWinner", !player.isWinner)}
                    className={cn(
                      "h-8 rounded-lg border text-xs font-semibold transition-colors",
                      player.isWinner
                        ? "border-amber-400 bg-amber-400/20 text-amber-500"
                        : "border-input text-muted-foreground hover:border-amber-400/50",
                    )}
                  >
                    {player.isWinner ? "👑" : "—"}
                  </button>
                  <button
                    type="button"
                    onClick={() => removePlayer(index)}
                    className="flex items-center justify-center size-7 rounded-lg text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2Icon className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleSubmit} disabled={isPending} className="w-full gap-2">
            {isPending ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <span className="size-4" />
            )}
            Log Session
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
