export type BggHotGame = {
  id: string;
  rank: number;
  name: string;
  yearPublished: string;
  thumbnail: string;
};

export type BggGame = {
  id: string;
  name: string;
  yearPublished: string;
  thumbnail: string;
  minPlayers: number;
  maxPlayers: number;
  rating: number;
};

export function parseBggSearchIds(xml: string): string[] {
  const ids: string[] = [];
  const itemRegex = /<item\s[^>]*>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const id = match[0].match(/\bid="(\d+)"/)?.[1];
    if (id) ids.push(id);
  }
  return ids;
}

export function parseBggThingGames(xml: string): BggGame[] {
  const games: BggGame[] = [];
  const itemRegex = /<item\b[^>]*>[\s\S]*?<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[0];
    const openTag = block.match(/^<item\b[^>]*/)?.[0] ?? "";

    const id = openTag.match(/\bid="(\d+)"/)?.[1] ?? "";
    const name =
      block.match(/<name type="primary"[^>]*value="([^"]+)"/)?.[1] ?? "";
    const yearPublished = block.match(/<yearpublished value="(\d+)"/)?.[1] ?? "";
    const thumbnailRaw = block.match(/<thumbnail>(.*?)<\/thumbnail>/)?.[1] ?? "";
    const thumbnail = thumbnailRaw.startsWith("//")
      ? `https:${thumbnailRaw}`
      : thumbnailRaw;
    const minPlayers = parseInt(block.match(/<minplayers value="(\d+)"/)?.[1] ?? "1");
    const maxPlayers = parseInt(block.match(/<maxplayers value="(\d+)"/)?.[1] ?? "1");
    const rating = parseFloat(block.match(/<average value="([^"]+)"/)?.[1] ?? "0");

    if (id && name) {
      games.push({ id, name, yearPublished, thumbnail, minPlayers, maxPlayers, rating });
    }
  }

  return games;
}

export function parseBggHotGames(xml: string): BggHotGame[] {
  const games: BggHotGame[] = [];
  const itemRegex = /<item\b[^>]*>[\s\S]*?<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[0];
    const openTag = block.match(/^<item\b[^>]*/)?.[0] ?? "";

    const id = openTag.match(/\bid="(\d+)"/)?.[1] ?? "";
    const rank = parseInt(openTag.match(/\brank="(\d+)"/)?.[1] ?? "0");
    const name = block.match(/<name value="([^"]+)"/)?.[1] ?? "";
    const yearPublished = block.match(/<yearpublished value="(\d+)"/)?.[1] ?? "";
    const thumbnailRaw = block.match(/<thumbnail value="([^"]+)"/)?.[1] ?? "";
    const thumbnail = thumbnailRaw.startsWith("//") ? `https:${thumbnailRaw}` : thumbnailRaw;

    if (id && name) {
      games.push({ id, rank, name, yearPublished, thumbnail });
    }
  }

  return games;
}
