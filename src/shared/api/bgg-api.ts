import { XMLParser } from "fast-xml-parser";
import { BGGGame } from "@/src/shared/types/game.types";

const BGG_BASE = "https://boardgamegeek.com/xmlapi2";
const BATCH_SIZE = 20;

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  isArray: (name) => ["item", "link", "rank"].includes(name),
  processEntities: true,
  htmlEntities: true,
});

async function bggFetch(path: string, revalidate?: number): Promise<string> {
  const url = `${BGG_BASE}${path}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.BGG_API_TOKEN}` },
    ...(revalidate != null ? { next: { revalidate } } : {}),
  });

  if (!res.ok) {
    throw new Error(`BGG API ${res.status}: ${url}`);
  }

  return res.text();
}

function parseThings(xml: string): BGGGame[] {
  const parsed = parser.parse(xml);
  const items: unknown[] = parsed?.items?.item ?? [];

  return items.flatMap((raw) => {
    const item = raw as Record<string, unknown>;
    const names = (
      Array.isArray(item.name) ? item.name : item.name ? [item.name] : []
    ) as Record<string, string>[];
    const primary = names.find((n) => n["@_type"] === "primary") ?? names[0];
    if (!primary) return [];

    const links = (item.link ?? []) as Record<string, string>[];
    const genres = links
      .filter((l) => l["@_type"] === "boardgamecategory")
      .map((l) => l["@_value"]);

    const ratings = (item.statistics as Record<string, unknown>)
      ?.ratings as Record<string, unknown>;
    const ranks = (ratings?.ranks as Record<string, unknown>)?.rank as Record<
      string,
      string
    >[];
    const boardgameRank = (ranks ?? []).find(
      (r) => r["@_name"] === "boardgame",
    );
    const rankRaw = boardgameRank?.["@_value"];
    const rank =
      !rankRaw || rankRaw === "Not Ranked" ? 0 : parseInt(rankRaw, 10);

    const avgRaw = (ratings?.average as Record<string, string>)?.["@_value"];
    const rating = avgRaw ? Math.round(parseFloat(avgRaw) * 100) / 100 : 0;

    const rawImage = String(item.image ?? item.thumbnail ?? "").trim();

    const int = (key: string) => {
      const v = (item[key] as Record<string, string>)?.["@_value"];
      return v ? parseInt(v, 10) || 0 : 0;
    };

    return [
      {
        id: String(item["@_id"]),
        name: primary["@_value"],
        yearPublished: String(
          (item.yearpublished as Record<string, string>)?.["@_value"] ?? "",
        ),
        description: String(item.description ?? ""),
        rating: isNaN(rating) ? 0 : rating,
        rank: isNaN(rank) ? 0 : rank,
        minPlayers: int("minplayers"),
        maxPlayers: int("maxplayers"),
        minPlaytime: int("minplaytime"),
        maxPlaytime: int("maxplaytime"),
        thumbnail: rawImage.startsWith("//") ? `https:${rawImage}` : rawImage,
        genres,
      },
    ];
  });
}

async function fetchThingsBatch(ids: string[]): Promise<BGGGame[]> {
  if (ids.length === 0) return [];
  const xml = await bggFetch(
    `/thing?id=${ids.join(",")}&stats=1&type=boardgame`,
  );
  return parseThings(xml);
}

export async function getHotGames(): Promise<BGGGame[]> {
  const xml = await bggFetch("/hot?type=boardgame", 3600);
  const parsed = parser.parse(xml);
  const hotItems = (parsed?.items?.item ?? []) as Record<string, string>[];
  const ids = hotItems.map((item) => item["@_id"]);

  const batches: string[][] = [];
  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    batches.push(ids.slice(i, i + BATCH_SIZE));
  }

  const results = await Promise.all(batches.map(fetchThingsBatch));
  const byId = new Map(results.flat().map((g) => [g.id, g]));
  return ids.flatMap((id) => {
    const game = byId.get(id);
    return game ? [game] : [];
  });
}

export async function searchGames(
  query: string,
  offset = 0,
): Promise<BGGGame[]> {
  const xml = await bggFetch(
    `/search?query=${encodeURIComponent(query)}&type=boardgame`,
    600,
  );
  const parsed = parser.parse(xml);
  const items = (parsed?.items?.item ?? []) as Record<string, string>[];
  const ids = items
    .slice(offset, offset + BATCH_SIZE)
    .map((item) => item["@_id"]);
  if (ids.length === 0) return [];
  return fetchThingsBatch(ids);
}

export async function getGameById(id: string): Promise<BGGGame | null> {
  const xml = await bggFetch(`/thing?id=${id}&stats=1`);
  return parseThings(xml)[0] ?? null;
}

