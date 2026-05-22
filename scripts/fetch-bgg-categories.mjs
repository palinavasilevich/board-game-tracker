/**
 * Fetches the BGG hot games list and collects all unique boardgamecategory
 * values, saving them to src/shared/data/bgg-categories.json.
 *
 * Run with: node scripts/fetch-bgg-categories.mjs
 */

import { XMLParser } from "fast-xml-parser";
import { writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dir = dirname(fileURLToPath(import.meta.url));
const TOKEN = process.env.BGG_API_TOKEN ?? "1eabe3c3-7722-4a70-bcfd-70e6aaa7b0f9";
const BASE = "https://boardgamegeek.com/xmlapi2";
const HEADERS = { Authorization: `Bearer ${TOKEN}` };
const BATCH = 20;

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  isArray: (name) => ["item", "link", "rank"].includes(name),
  processEntities: true,
  htmlEntities: true,
});

async function bggFetch(path) {
  const res = await fetch(`${BASE}${path}`, { headers: HEADERS });
  if (!res.ok) throw new Error(`BGG ${res.status}: ${path}`);
  return res.text();
}

async function fetchCategories(ids) {
  const categories = new Set();
  for (let i = 0; i < ids.length; i += BATCH) {
    const batch = ids.slice(i, i + BATCH);
    const xml = await bggFetch(`/thing?id=${batch.join(",")}&stats=1&type=boardgame`);
    const parsed = parser.parse(xml);
    const items = parsed?.items?.item ?? [];
    for (const item of items) {
      const links = item.link ?? [];
      for (const link of links) {
        if (link["@_type"] === "boardgamecategory") {
          categories.add(link["@_value"]);
        }
      }
    }
    // Avoid hammering the BGG API
    if (i + BATCH < ids.length) await new Promise(r => setTimeout(r, 500));
  }
  return categories;
}

async function main() {
  console.log("Fetching hot games list...");
  const hotXml = await bggFetch("/hot?type=boardgame");
  const hotParsed = parser.parse(hotXml);
  const hotItems = hotParsed?.items?.item ?? [];
  const hotIds = hotItems.map(item => item["@_id"]);
  console.log(`  Got ${hotIds.length} hot game IDs`);

  // Also fetch some well-known top-ranked games to broaden category coverage
  const topIds = [
    "224517", // Brass Birmingham
    "174430", // Gloomhaven
    "167791", // Terraforming Mars
    "233078", // Spirit Island
    "169786", // Scythe
    "266192", // Wingspan
    "316554", // Dune: Imperium
    "342942", // Ark Nova
    "291457", // Gloomhaven: Jaws of the Lion
    "161936", // Pandemic Legacy Season 1
    "187645", // Star Wars: Rebellion
    "220308", // Gaia Project
    "182028", // Through the Ages: A New Story of Civilization
    "12333",  // Twilight Struggle
    "37111",  // Agricola
    "31260",  // Dominion
    "68448",  // 7 Wonders
    "120677", // Terra Mystica
    "28143",  // Race for the Galaxy
    "2651",   // Power Grid
  ];

  const allIds = [...new Set([...hotIds, ...topIds])];
  console.log(`Fetching details for ${allIds.length} games...`);
  const categories = await fetchCategories(allIds);

  const sorted = [...categories].sort((a, b) => a.localeCompare(b));
  console.log(`\nFound ${sorted.length} unique categories:`);
  sorted.forEach(c => console.log(`  ${c}`));

  const outDir = join(__dir, "../src/shared/data");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "bgg-categories.json");
  writeFileSync(outPath, JSON.stringify(sorted, null, 2) + "\n");
  console.log(`\nSaved to ${outPath}`);
}

main().catch(err => { console.error(err); process.exit(1); });
