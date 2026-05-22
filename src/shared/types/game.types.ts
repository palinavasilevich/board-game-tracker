export type BGGGame = {
  id: string;
  name: string;
  yearPublished: string;
  description: string;
  rating: number;
  rank: number;
  minPlayers: number;
  maxPlayers: number;
  minPlaytime: number;
  maxPlaytime: number;
  thumbnail: string;
  genres: string[];
};

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
  userScore: number;
  genres: { genre: { id: string; name: string } }[];
};
