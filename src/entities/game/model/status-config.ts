import { UserGameStatus } from "@/src/lib/generated/prisma/enums";

export const STATUS_LABELS: Record<UserGameStatus, string> = {
  OWNED: "Owned",
  WISHLIST: "Wishlist",
};

export const STATUS_BADGE_COLORS: Record<UserGameStatus, string> = {
  OWNED: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
  WISHLIST: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

export const STATUS_TEXT_COLORS: Record<UserGameStatus, string> = {
  OWNED: "text-emerald-400",
  WISHLIST: "text-amber-400",
};
