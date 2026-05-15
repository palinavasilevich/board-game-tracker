export type BggHotGame = {
  id: string;
  rank: number;
  name: string;
  yearPublished: string;
  thumbnail: string;
};

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
