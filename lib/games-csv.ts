import fs from "fs";
import path from "path";
import { BGGGame } from "@/shared/types/game.types";

function parseLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      fields.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  fields.push(current.trim());
  return fields;
}

function findCol(headers: string[], ...names: string[]): number {
  for (const name of names) {
    const idx = headers.indexOf(name);
    if (idx !== -1) return idx;
  }
  return -1;
}

export function readGamesFromCsv(): BGGGame[] {
  const csvPath = path.join(process.cwd(), "data", "games.csv");
  const lines = fs.readFileSync(csvPath, "utf-8").trim().split(/\r?\n/);

  const rawHeaders = parseLine(lines[0]);
  // Normalize: lowercase, strip spaces/underscores/dashes (but keep colons for Cat: detection)
  const headers = rawHeaders.map((h) =>
    h.toLowerCase().replace(/[\s_-]+/g, ""),
  );

  const idCol = findCol(headers, "bggid", "id", "gameid");
  const nameCol = findCol(headers, "name");
  const yearCol = findCol(headers, "yearpublished", "yearpub", "year");
  const descCol = findCol(headers, "description", "desc");
  const ratingCol = findCol(
    headers,
    "avgrating",
    "ratingaverage",
    "averagerating",
    "bayesavgrating",
    "average",
    "rating",
  );
  const rankCol = findCol(headers, "rank:boardgame", "boardgamerank", "rank");
  const minPlayersCol = findCol(headers, "minplayers");
  const maxPlayersCol = findCol(headers, "maxplayers");
  const minPlaytimeCol = findCol(
    headers,
    "comminplaytime",
    "minplaytime",
    "mfgplaytime",
  );
  const maxPlaytimeCol = findCol(headers, "commaxplaytime", "maxplaytime");
  const thumbnailCol = findCol(
    headers,
    "imagepath",
    "thumbnail",
    "imageurl",
    "imagelink",
    "image",
    "img",
  );
  const domainsCol = findCol(headers, "domains", "genres", "categories");

  // Detect boolean category columns: Cat:Thematic, Cat:Strategy, etc.
  const catCols: { name: string; idx: number }[] = [];
  headers.forEach((h, idx) => {
    if (h.startsWith("cat:")) {
      const label = h.slice(4);
      catCols.push({
        name: label.charAt(0).toUpperCase() + label.slice(1),
        idx,
      });
    }
  });

  return lines.slice(1).flatMap((line) => {
    const trimmed = line.replace(/\r$/, "");
    if (!trimmed) return [];

    const fields = parseLine(trimmed);
    const bggId = idCol !== -1 ? fields[idCol] : "";
    const name = nameCol !== -1 ? fields[nameCol] : "";

    if (!bggId || !name) return [];

    const rawRating = ratingCol !== -1 ? parseFloat(fields[ratingCol]) : NaN;
    const rawRank = rankCol !== -1 ? parseInt(fields[rankCol], 10) : NaN;
    const rawMinPlayers =
      minPlayersCol !== -1 ? parseInt(fields[minPlayersCol], 10) : NaN;
    const rawMaxPlayers =
      maxPlayersCol !== -1 ? parseInt(fields[maxPlayersCol], 10) : NaN;
    const rawMinPlaytime =
      minPlaytimeCol !== -1 ? parseInt(fields[minPlaytimeCol], 10) : NaN;
    const rawMaxPlaytime =
      maxPlaytimeCol !== -1 ? parseInt(fields[maxPlaytimeCol], 10) : NaN;

    let genres: string[] = [];
    if (catCols.length > 0) {
      genres = catCols
        .filter(({ idx }) => fields[idx] === "1")
        .map(({ name }) => name);
    } else if (domainsCol !== -1 && fields[domainsCol]) {
      genres = fields[domainsCol]
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean);
    }

    return [
      {
        id: bggId,
        name,
        yearPublished: yearCol !== -1 ? (fields[yearCol] ?? "") : "",
        description: descCol !== -1 ? (fields[descCol] ?? "") : "",
        rating: isNaN(rawRating) ? 0 : Math.round(rawRating * 100) / 100,
        rank: isNaN(rawRank) ? 0 : rawRank,
        minPlayers: isNaN(rawMinPlayers) ? 0 : rawMinPlayers,
        maxPlayers: isNaN(rawMaxPlayers) ? 0 : rawMaxPlayers,
        minPlaytime: isNaN(rawMinPlaytime) ? 0 : rawMinPlaytime,
        maxPlaytime: isNaN(rawMaxPlaytime) ? 0 : rawMaxPlaytime,
        thumbnail: thumbnailCol !== -1 ? (fields[thumbnailCol] ?? "") : "",
        genres,
      },
    ];
  });
}

export function readGenresFromCsv(games = readGamesFromCsv()): string[] {
  const genreSet = new Set<string>();
  for (const game of games) {
    for (const g of game.genres) genreSet.add(g);
  }
  return [...genreSet].sort();
}
