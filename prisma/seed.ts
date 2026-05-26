import "dotenv/config";
import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/lib/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting to populate the database...");
  const defaultPassword = await bcrypt.hash("123456", 10);

  // Genres
  console.log("Adding genres...");
  const [
    strategy,
    cooperative,
    deckBuilding,
    areaControl,
    engineBuilding,
    thematic,
    adventure,
  ] = await Promise.all([
    prisma.genre.upsert({
      where: { name: "Strategy" },
      update: {},
      create: { name: "Strategy" },
    }),
    prisma.genre.upsert({
      where: { name: "Cooperative" },
      update: {},
      create: { name: "Cooperative" },
    }),
    prisma.genre.upsert({
      where: { name: "Deck-building" },
      update: {},
      create: { name: "Deck-building" },
    }),
    prisma.genre.upsert({
      where: { name: "Area Control" },
      update: {},
      create: { name: "Area Control" },
    }),
    prisma.genre.upsert({
      where: { name: "Engine Building" },
      update: {},
      create: { name: "Engine Building" },
    }),
    prisma.genre.upsert({
      where: { name: "Thematic" },
      update: {},
      create: { name: "Thematic" },
    }),
    prisma.genre.upsert({
      where: { name: "Adventure" },
      update: {},
      create: { name: "Adventure" },
    }),
  ]);

  // Games
  console.log("Adding games...");
  const [inis, scythe, keepTheHeroesOut, thorgal, lotrFate, arkhamHorror] =
    await Promise.all([
      prisma.game.upsert({
        where: { externalId: "155821" },
        update: {},
        create: {
          externalId: "155821",
          name: "Inis",
          description:
            "A Celtic mythology area-control game where players compete to fulfill the conditions for becoming High King of Ireland — through territory, leadership, or sacred sites.",
          yearPublished: "2016",
          minPlayers: 2,
          maxPlayers: 4,
          minPlaytime: 60,
          maxPlaytime: 90,
          rank: 97,
          metaScore: 7.8,
          imageUrl:
            "https://cf.geekdo-images.com/6QE8mnPFmauoj2THsyUYPA__imagepage/img/9pyk8cWtJkL4lytcpa-5QF94zaE=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4739757.jpg",
        },
      }),
      prisma.game.upsert({
        where: { externalId: "169786" },
        update: {},
        create: {
          externalId: "169786",
          name: "Scythe",
          description:
            "An engine-building game set in an alternate-history 1920s Eastern Europa, where factions compete for land and resources in the shadow of giant mechs.",
          yearPublished: "2016",
          minPlayers: 1,
          maxPlayers: 5,
          minPlaytime: 90,
          maxPlaytime: 120,
          rank: 17,
          metaScore: 8.2,
          imageUrl:
            "https://cf.geekdo-images.com/7k_nOxpO9OGIjhLq2BUZdA__imagepage@2x/img/DjzadozjcJUwXDwyQ-o7mQIqYfw=/fit-in/1800x1200/filters:strip_icc()/pic3163924.jpg",
        },
      }),
      prisma.game.upsert({
        where: { externalId: "359669" },
        update: {},
        create: {
          externalId: "359669",
          name: "Keep the Heroes Out",
          description:
            "A cooperative tower-defense game where players take the role of dungeon monsters defending their lair and treasure from waves of invading heroes.",
          yearPublished: "2022",
          minPlayers: 1,
          maxPlayers: 4,
          minPlaytime: 20,
          maxPlaytime: 40,
          rank: 312,
          metaScore: 7.5,
          imageUrl:
            "https://cf.geekdo-images.com/lfFKMNCzIJesp8IFHK8dEw__imagepagezoom/img/c5E0zRlzFTjkfKlyORshX1bmybI=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic6985339.jpg",
        },
      }),
      prisma.game.upsert({
        where: { externalId: "371942" },
        update: {},
        create: {
          externalId: "371942",
          name: "Thorgal",
          description:
            "An adventure game based on the beloved Belgian comic series, following Thorgal Aegirsson through perilous quests in a world blending Norse mythology and science fiction.",
          yearPublished: "2023",
          minPlayers: 1,
          maxPlayers: 4,
          minPlaytime: 60,
          maxPlaytime: 120,
          rank: 580,
          metaScore: 7.6,
          imageUrl:
            "https://cf.geekdo-images.com/6LmOBOKXXS8I3nX7I4hz_g__imagepage@2x/img/XDYXu0Qia15fcRWXHYVjnibd-cM=/fit-in/1800x1200/filters:strip_icc()/pic6724739.jpg",
        },
      }),
      prisma.game.upsert({
        where: { externalId: "436217" },
        update: {},
        create: {
          externalId: "436217",
          name: "The Lord of the Rings: Fate of the Fellowship",
          description:
            "A cooperative game set in Middle-earth where players guide the Fellowship on their desperate quest to destroy the One Ring before Sauron's forces close in.",
          yearPublished: "2025",
          minPlayers: 1,
          maxPlayers: 5,
          minPlaytime: 60,
          maxPlaytime: 150,
          rank: 87,
          metaScore: 8.3,
          imageUrl:
            "https://cf.geekdo-images.com/scw36iBIad7l-rGzxPGcGg__imagepage@2x/img/UrtnTbXuVEX0vYPD-kmN3UaEwqg=/fit-in/1800x1200/filters:strip_icc()/pic8662670.png",
        },
      }),
      prisma.game.upsert({
        where: { externalId: "205637" },
        update: {},
        create: {
          externalId: "205637",
          name: "Arkham Horror: The Card Game",
          description:
            "A cooperative living card game set in Lovecraft's Arkham. Investigators build custom decks and work together to survive escalating mythos threats across linked scenarios.",
          yearPublished: "2016",
          minPlayers: 1,
          maxPlayers: 2,
          minPlaytime: 60,
          maxPlaytime: 120,
          rank: 9,
          metaScore: 8.5,
          imageUrl:
            "https://cf.geekdo-images.com/B5F5ulz0UivNgrI9Ky0euA__imagepage/img/tgpLRvv6AIsClnegErNpAoieeMo=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3122349.jpg",
        },
      }),
    ]);

  // Game–Genre relations
  console.log("Linking genres to games...");
  const gameGenreLinks = [
    { gameId: inis.id, genreId: strategy.id },
    { gameId: inis.id, genreId: areaControl.id },
    { gameId: scythe.id, genreId: strategy.id },
    { gameId: scythe.id, genreId: engineBuilding.id },
    { gameId: scythe.id, genreId: areaControl.id },
    { gameId: keepTheHeroesOut.id, genreId: cooperative.id },
    { gameId: thorgal.id, genreId: adventure.id },
    { gameId: thorgal.id, genreId: strategy.id },
    { gameId: lotrFate.id, genreId: cooperative.id },
    { gameId: lotrFate.id, genreId: thematic.id },
    { gameId: arkhamHorror.id, genreId: cooperative.id },
    { gameId: arkhamHorror.id, genreId: deckBuilding.id },
    { gameId: arkhamHorror.id, genreId: thematic.id },
  ];

  for (const link of gameGenreLinks) {
    await prisma.gameGenre.upsert({
      where: { gameId_genreId: link },
      update: {},
      create: link,
    });
  }

  // Users
  console.log("Adding users...");
  const admin = await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      email: "admin@gmail.com",
      name: "Admin",
      password: defaultPassword,
    },
  });

  // UserGame collections — personal collection as OWNED
  console.log("Adding user game collections...");
  await Promise.all(
    [inis, scythe, keepTheHeroesOut, thorgal, lotrFate, arkhamHorror].map(
      (game) =>
        prisma.userGame.upsert({
          where: { userId_gameId: { userId: admin.id, gameId: game.id } },
          update: {},
          create: { userId: admin.id, gameId: game.id, status: "OWNED" },
        }),
    ),
  );

  // Reviews
  console.log("Adding reviews...");
  await Promise.all([
    prisma.review.upsert({
      where: { userId_gameId: { userId: admin.id, gameId: inis.id } },
      update: {},
      create: {
        userId: admin.id,
        gameId: inis.id,
        rating: 9,
        body: "Incredibly elegant design. Every card serves triple duty and the three victory conditions keep everyone in constant tension until the final turn.",
      },
    }),
    prisma.review.upsert({
      where: { userId_gameId: { userId: admin.id, gameId: scythe.id } },
      update: {},
      create: {
        userId: admin.id,
        gameId: scythe.id,
        rating: 9,
        body: "The production quality is stunning and the engine-building is deeply satisfying. Each faction feels meaningfully different.",
      },
    }),
    prisma.review.upsert({
      where: { userId_gameId: { userId: admin.id, gameId: arkhamHorror.id } },
      update: {},
      create: {
        userId: admin.id,
        gameId: arkhamHorror.id,
        rating: 10,
        body: "The best cooperative card game ever made. The campaign system and narrative depth are unmatched — every session tells a unique story.",
      },
    }),
  ]);

  const [genreCount, gameCount, userCount, reviewCount] = await Promise.all([
    prisma.genre.count(),
    prisma.game.count(),
    prisma.user.count(),
    prisma.review.count(),
  ]);

  console.log(`✅ Done! Added:`);
  console.log(`  - ${genreCount} genres`);
  console.log(`  - ${gameCount} games`);
  console.log(`  - ${userCount} users`);
  console.log(`  - ${reviewCount} reviews`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error("❌ Error:", e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
