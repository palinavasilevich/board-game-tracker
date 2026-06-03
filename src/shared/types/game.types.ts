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
  thumbnail?: string;
  genres: string[];
  publishers: { id: string; name: string }[];
  designers: { id: string; name: string }[];
};
