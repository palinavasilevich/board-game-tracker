import type { BggHotGame } from "@/lib/bgg";
import { parseBggHotGames } from "@/lib/bgg";

const MOCK_GAMES: BggHotGame[] = [
  {
    id: "174430",
    rank: 1,
    name: "Gloomhaven",
    yearPublished: "2017",
    thumbnail:
      "https://cf.geekdo-images.com/lxzo9PekKd4TRyBUlLH7Yw__imagepagezoom/img/1osS0g7Ab-y95zPvs3WUYaDKHqM=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic8703614.png",
  },
  {
    id: "342942",
    rank: 2,
    name: "Ark Nova",
    yearPublished: "2021",
    thumbnail:
      "https://cf.geekdo-images.com/lxzo9PekKd4TRyBUlLH7Yw__imagepagezoom/img/1osS0g7Ab-y95zPvs3WUYaDKHqM=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic8703614.png",
  },
  {
    id: "224517",
    rank: 3,
    name: "Brass: Birmingham",
    yearPublished: "2018",
    thumbnail:
      "https://cf.geekdo-images.com/lxzo9PekKd4TRyBUlLH7Yw__imagepagezoom/img/1osS0g7Ab-y95zPvs3WUYaDKHqM=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic8703614.png",
  },
  {
    id: "266192",
    rank: 4,
    name: "Wingspan",
    yearPublished: "2019",
    thumbnail:
      "https://cf.geekdo-images.com/lxzo9PekKd4TRyBUlLH7Yw__imagepagezoom/img/1osS0g7Ab-y95zPvs3WUYaDKHqM=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic8703614.png",
  },
  {
    id: "316554",
    rank: 5,
    name: "Dune: Imperium",
    yearPublished: "2020",
    thumbnail:
      "https://cf.geekdo-images.com/lxzo9PekKd4TRyBUlLH7Yw__imagepagezoom/img/1osS0g7Ab-y95zPvs3WUYaDKHqM=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic8703614.png",
  },
  {
    id: "312484",
    rank: 6,
    name: "Lost Ruins of Arnak",
    yearPublished: "2020",
    thumbnail:
      "https://cf.geekdo-images.com/lxzo9PekKd4TRyBUlLH7Yw__imagepagezoom/img/1osS0g7Ab-y95zPvs3WUYaDKHqM=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic8703614.png",
  },
  {
    id: "162886",
    rank: 7,
    name: "Spirit Island",
    yearPublished: "2017",
    thumbnail:
      "https://cf.geekdo-images.com/lxzo9PekKd4TRyBUlLH7Yw__imagepagezoom/img/1osS0g7Ab-y95zPvs3WUYaDKHqM=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic8703614.png",
  },
  {
    id: "237182",
    rank: 8,
    name: "Root",
    yearPublished: "2018",
    thumbnail:
      "https://cf.geekdo-images.com/lxzo9PekKd4TRyBUlLH7Yw__imagepagezoom/img/1osS0g7Ab-y95zPvs3WUYaDKHqM=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic8703614.png",
  },
  {
    id: "167791",
    rank: 9,
    name: "Terraforming Mars",
    yearPublished: "2016",
    thumbnail:
      "https://cf.geekdo-images.com/lxzo9PekKd4TRyBUlLH7Yw__imagepagezoom/img/1osS0g7Ab-y95zPvs3WUYaDKHqM=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic8703614.png",
  },
  {
    id: "366013",
    rank: 10,
    name: "Heat: Pedal to the Metal",
    yearPublished: "2022",
    thumbnail:
      "https://cf.geekdo-images.com/lxzo9PekKd4TRyBUlLH7Yw__imagepagezoom/img/1osS0g7Ab-y95zPvs3WUYaDKHqM=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic8703614.png",
  },
  {
    id: "295947",
    rank: 11,
    name: "Cascadia",
    yearPublished: "2021",
    thumbnail:
      "https://cf.geekdo-images.com/lxzo9PekKd4TRyBUlLH7Yw__imagepagezoom/img/1osS0g7Ab-y95zPvs3WUYaDKHqM=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic8703614.png",
  },
  {
    id: "350184",
    rank: 12,
    name: "Earth",
    yearPublished: "2023",
    thumbnail:
      "https://cf.geekdo-images.com/lxzo9PekKd4TRyBUlLH7Yw__imagepagezoom/img/1osS0g7Ab-y95zPvs3WUYaDKHqM=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic8703614.png",
  },
  {
    id: "230802",
    rank: 13,
    name: "Azul",
    yearPublished: "2017",
    thumbnail:
      "https://cf.geekdo-images.com/lxzo9PekKd4TRyBUlLH7Yw__imagepagezoom/img/1osS0g7Ab-y95zPvs3WUYaDKHqM=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic8703614.png",
  },
  {
    id: "199792",
    rank: 14,
    name: "Everdell",
    yearPublished: "2018",
    thumbnail:
      "https://cf.geekdo-images.com/lxzo9PekKd4TRyBUlLH7Yw__imagepagezoom/img/1osS0g7Ab-y95zPvs3WUYaDKHqM=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic8703614.png",
  },
  {
    id: "291457",
    rank: 15,
    name: "Gloomhaven: Jaws of the Lion",
    yearPublished: "2020",
    thumbnail:
      "https://cf.geekdo-images.com/lxzo9PekKd4TRyBUlLH7Yw__imagepagezoom/img/1osS0g7Ab-y95zPvs3WUYaDKHqM=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic8703614.png",
  },
  {
    id: "220308",
    rank: 16,
    name: "Gaia Project",
    yearPublished: "2017",
    thumbnail:
      "https://cf.geekdo-images.com/lxzo9PekKd4TRyBUlLH7Yw__imagepagezoom/img/1osS0g7Ab-y95zPvs3WUYaDKHqM=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic8703614.png",
  },
  {
    id: "187645",
    rank: 17,
    name: "Star Wars: Rebellion",
    yearPublished: "2016",
    thumbnail:
      "https://cf.geekdo-images.com/lxzo9PekKd4TRyBUlLH7Yw__imagepagezoom/img/1osS0g7Ab-y95zPvs3WUYaDKHqM=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic8703614.png",
  },
  {
    id: "124361",
    rank: 18,
    name: "Concordia",
    yearPublished: "2013",
    thumbnail:
      "https://cf.geekdo-images.com/lxzo9PekKd4TRyBUlLH7Yw__imagepagezoom/img/1osS0g7Ab-y95zPvs3WUYaDKHqM=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic8703614.png",
  },
  {
    id: "182028",
    rank: 19,
    name: "Through the Ages: A New Story",
    yearPublished: "2015",
    thumbnail:
      "https://cf.geekdo-images.com/lxzo9PekKd4TRyBUlLH7Yw__imagepagezoom/img/1osS0g7Ab-y95zPvs3WUYaDKHqM=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic8703614.png",
  },
  {
    id: "233078",
    rank: 20,
    name: "Twilight Imperium 4th Ed.",
    yearPublished: "2017",
    thumbnail:
      "https://cf.geekdo-images.com/lxzo9PekKd4TRyBUlLH7Yw__imagepagezoom/img/1osS0g7Ab-y95zPvs3WUYaDKHqM=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic8703614.png",
  },
];

export async function GET() {
  try {
    const res = await fetch("https://boardgamegeek.com/xmlapi2/hot?type=boardgame", {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; board-game-tracker/1.0)",
      },
    });

    if (res.ok) {
      const xml = await res.text();
      return Response.json(parseBggHotGames(xml));
    }
  } catch {
    // fall through to mock data
  }

  return Response.json(MOCK_GAMES);
}
