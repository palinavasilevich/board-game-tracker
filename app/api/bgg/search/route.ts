import type { BggGame } from "@/lib/bgg";
import { parseBggSearchIds, parseBggThingGames } from "@/lib/bgg";
import { type NextRequest } from "next/server";

const BGG_HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; board-game-tracker/1.0)",
};

const MOCK_GAMES: BggGame[] = [
  { id: "174430", name: "Gloomhaven", yearPublished: "2017", thumbnail: "https://cf.geekdo-images.com/sZYp_3BTDGjh2unaZfZmuA__thumb/img/veqFeP4d_3zNaFe-wqZhQMyDxe0=/fit-in/200x150/filters:strip_icc()/pic2437871.jpg", minPlayers: 1, maxPlayers: 4, rating: 8.62 },
  { id: "342942", name: "Ark Nova", yearPublished: "2021", thumbnail: "https://cf.geekdo-images.com/SoU8p28Sk1s8MSvoM4N8pQ__thumb/img/uIjeoKgHMcRtzAy2oOZvgaF2gTk=/fit-in/200x150/filters:strip_icc()/pic6293412.jpg", minPlayers: 1, maxPlayers: 4, rating: 8.59 },
  { id: "224517", name: "Brass: Birmingham", yearPublished: "2018", thumbnail: "https://cf.geekdo-images.com/x3zoDCEJk7mYHxHXEUFLhg__thumb/img/wVIALNFsNnbKLLjLNS7SgZE5aSk=/fit-in/200x150/filters:strip_icc()/pic3490053.jpg", minPlayers: 2, maxPlayers: 4, rating: 8.66 },
  { id: "266192", name: "Wingspan", yearPublished: "2019", thumbnail: "https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__thumb/img/zNMXGOQrnBQPFOSJW7oKLaB0Gws=/fit-in/200x150/filters:strip_icc()/pic4458123.jpg", minPlayers: 1, maxPlayers: 5, rating: 8.05 },
  { id: "316554", name: "Dune: Imperium", yearPublished: "2020", thumbnail: "https://cf.geekdo-images.com/PhjygpWSo-0labGrPBMyyg__thumb/img/R4nnm5TFEIm-g4LqS9hSYaM3yKo=/fit-in/200x150/filters:strip_icc()/pic5666597.jpg", minPlayers: 1, maxPlayers: 4, rating: 8.35 },
  { id: "162886", name: "Spirit Island", yearPublished: "2017", thumbnail: "https://cf.geekdo-images.com/viAHAJhfy6DFjCSm5MqM5w__thumb/img/M_5DQgBVyRhHX9I0KhH0Q6-zqRQ=/fit-in/200x150/filters:strip_icc()/pic3615739.png", minPlayers: 1, maxPlayers: 4, rating: 8.37 },
  { id: "237182", name: "Root", yearPublished: "2018", thumbnail: "https://cf.geekdo-images.com/JUAUWaVUzeBgzirhZNmHHw__thumb/img/eiPQX7JT-0Vm_VfLQRBzKRiohE8=/fit-in/200x150/filters:strip_icc()/pic4254509.jpg", minPlayers: 2, maxPlayers: 4, rating: 8.08 },
  { id: "312484", name: "Lost Ruins of Arnak", yearPublished: "2020", thumbnail: "https://cf.geekdo-images.com/U0QogaT3gQnKBR_oGBuMbg__thumb/img/hRXvQKNiFd0SqLvqMgJPULbkO60=/fit-in/200x150/filters:strip_icc()/pic5674958.jpg", minPlayers: 1, maxPlayers: 4, rating: 8.11 },
];

async function bggFetch(url: string) {
  const res = await fetch(url, { next: { revalidate: 3600 }, headers: BGG_HEADERS });
  if (!res.ok) throw new Error(`BGG ${res.status}`);
  return res.text();
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query")?.trim();

  if (!query) {
    return Response.json({ error: "Missing query parameter" }, { status: 400 });
  }

  try {
    const searchXml = await bggFetch(
      `https://boardgamegeek.com/xmlapi2/search?query=${encodeURIComponent(query)}&type=boardgame&exact=0`,
    );

    const ids = parseBggSearchIds(searchXml).slice(0, 10);

    if (ids.length === 0) return Response.json([]);

    const thingXml = await bggFetch(
      `https://boardgamegeek.com/xmlapi2/thing?id=${ids.join(",")}&type=boardgame&stats=1`,
    );

    const games = parseBggThingGames(thingXml);
    return Response.json(games);
  } catch {
    const lower = query.toLowerCase();
    const filtered = MOCK_GAMES.filter((g) => g.name.toLowerCase().includes(lower));
    return Response.json(filtered);
  }
}
