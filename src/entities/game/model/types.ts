import type { UserGameStatus } from "@/src/lib/generated/prisma/enums";

export type AppGame = {
  id: string;
  externalId: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  yearPublished: string | null;
  rank: number;
  minPlayers: number;
  maxPlayers: number;
  minPlaytime: number;
  maxPlaytime: number;
  metaScore: number;
  userScore: number | null;
  userStatus?: UserGameStatus | null;
  genres: { genre: { id: string; name: string } }[];
};

export type GameCardData = {
  id: string;
  externalId?: string;
  name: string;
  imageUrl: string | null;
  yearPublished: string | null;
  rank: number;
  metaScore: number;
  userScore?: number | null;
  userStatus?: UserGameStatus | null;
};
