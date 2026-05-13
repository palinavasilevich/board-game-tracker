import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting to populate the database...");

  // Genres
  console.log("Adding genres...");
  const [strategy, party, family, cooperative, deckBuilding] =
    await Promise.all([
      prisma.genre.upsert({
        where: { name: "Strategy" },
        update: {},
        create: { name: "Strategy" },
      }),
      prisma.genre.upsert({
        where: { name: "Party" },
        update: {},
        create: { name: "Party" },
      }),
      prisma.genre.upsert({
        where: { name: "Family" },
        update: {},
        create: { name: "Family" },
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
    ]);

  // Games
  console.log("Adding games...");
  const [catan, pandemic, codenames, dominion, ticketToRide] =
    await Promise.all([
      prisma.game.upsert({
        where: { externalId: "BGG-13" },
        update: {},
        create: {
          externalId: "BGG-13",
          name: "Catan",
          description:
            "Trade, build, and settle the island of Catan in this classic resource-management game.",
          imageUrl:
            "https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__thumb/img/8a9HeqFydO7UnpR9FKu4tXMCRHY=/fit-in/200x150/filters:strip_icc()/pic2419375.jpg",
          metaScore: 7.2,
          userScore: 7.1,
        },
      }),
      prisma.game.upsert({
        where: { externalId: "BGG-30549" },
        update: {},
        create: {
          externalId: "BGG-30549",
          name: "Pandemic",
          description:
            "Work together to stop four diseases from spreading across the globe.",
          imageUrl:
            "https://cf.geekdo-images.com/S3ybV1LAp-8SnHIXLLjVqA__thumb/img/a6lXwgBfQLlmMBBLRPo5BAPYH5A=/fit-in/200x150/filters:strip_icc()/pic1534148.jpg",
          metaScore: 7.6,
          userScore: 7.5,
        },
      }),
      prisma.game.upsert({
        where: { externalId: "BGG-178900" },
        update: {},
        create: {
          externalId: "BGG-178900",
          name: "Codenames",
          description:
            "Give one-word clues to help your team identify secret agents on a grid of words.",
          imageUrl:
            "https://cf.geekdo-images.com/F_KDEu0GjdClml8N7c8Imw__thumb/img/bdR2DAbOHsQbVhBcGS_xFxnGdAs=/fit-in/200x150/filters:strip_icc()/pic2582929.jpg",
          metaScore: 7.7,
          userScore: 7.6,
        },
      }),
      prisma.game.upsert({
        where: { externalId: "BGG-36218" },
        update: {},
        create: {
          externalId: "BGG-36218",
          name: "Dominion",
          description:
            "Build your deck from a shared supply of cards to gain the most victory points.",
          imageUrl:
            "https://cf.geekdo-images.com/j4rr4dBVIgBW3QIh9EHSkA__thumb/img/ZhtPPPGNAMSAWc9A3M6FZQT0Tic=/fit-in/200x150/filters:strip_icc()/pic394356.jpg",
          metaScore: 7.6,
          userScore: 7.4,
        },
      }),
      prisma.game.upsert({
        where: { externalId: "BGG-9209" },
        update: {},
        create: {
          externalId: "BGG-9209",
          name: "Ticket to Ride",
          description:
            "Collect cards and claim railway routes across the map to connect cities.",
          imageUrl:
            "https://cf.geekdo-images.com/ZWJg0dCdrWHxVnc0eFXK8w__thumb/img/ufM6Rq7TJCJv9DaQXxGBqYTsOQI=/fit-in/200x150/filters:strip_icc()/pic38668.jpg",
          metaScore: 7.4,
          userScore: 7.4,
        },
      }),
    ]);

  // Game–Genre relations
  console.log("Linking genres to games...");
  const gameGenreLinks = [
    { gameId: catan.id, genreId: strategy.id },
    { gameId: catan.id, genreId: family.id },
    { gameId: pandemic.id, genreId: strategy.id },
    { gameId: pandemic.id, genreId: cooperative.id },
    { gameId: codenames.id, genreId: party.id },
    { gameId: dominion.id, genreId: strategy.id },
    { gameId: dominion.id, genreId: deckBuilding.id },
    { gameId: ticketToRide.id, genreId: strategy.id },
    { gameId: ticketToRide.id, genreId: family.id },
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
  const [alice, bob] = await Promise.all([
    prisma.user.upsert({
      where: { email: "alice@example.com" },
      update: {},
      create: {
        email: "alice@example.com",
        name: "Alice",
        password: "123456",
      },
    }),
    prisma.user.upsert({
      where: { email: "bob@example.com" },
      update: {},
      create: {
        email: "bob@example.com",
        name: "Bob",
        password: "123456",
      },
    }),
  ]);

  // UserGame collections
  console.log("Adding user game collections...");
  await Promise.all([
    prisma.userGame.upsert({
      where: { userId_gameId: { userId: alice.id, gameId: catan.id } },
      update: {},
      create: { userId: alice.id, gameId: catan.id, status: "OWNED" },
    }),
    prisma.userGame.upsert({
      where: { userId_gameId: { userId: alice.id, gameId: pandemic.id } },
      update: {},
      create: { userId: alice.id, gameId: pandemic.id, status: "OWNED" },
    }),
    prisma.userGame.upsert({
      where: { userId_gameId: { userId: alice.id, gameId: dominion.id } },
      update: {},
      create: { userId: alice.id, gameId: dominion.id, status: "WISHLIST" },
    }),
    prisma.userGame.upsert({
      where: { userId_gameId: { userId: bob.id, gameId: catan.id } },
      update: {},
      create: { userId: bob.id, gameId: catan.id, status: "PLAYED" },
    }),
    prisma.userGame.upsert({
      where: { userId_gameId: { userId: bob.id, gameId: codenames.id } },
      update: {},
      create: { userId: bob.id, gameId: codenames.id, status: "OWNED" },
    }),
    prisma.userGame.upsert({
      where: {
        userId_gameId: { userId: bob.id, gameId: ticketToRide.id },
      },
      update: {},
      create: {
        userId: bob.id,
        gameId: ticketToRide.id,
        status: "OWNED",
      },
    }),
  ]);

  // Reviews
  console.log("Adding reviews...");
  await Promise.all([
    prisma.review.upsert({
      where: { userId_gameId: { userId: alice.id, gameId: catan.id } },
      update: {},
      create: {
        userId: alice.id,
        gameId: catan.id,
        rating: 8,
        body: "A classic that never gets old. Great for introducing new players.",
      },
    }),
    prisma.review.upsert({
      where: { userId_gameId: { userId: alice.id, gameId: pandemic.id } },
      update: {},
      create: {
        userId: alice.id,
        gameId: pandemic.id,
        rating: 9,
        body: "Best cooperative game out there. Tense and rewarding.",
      },
    }),
    prisma.review.upsert({
      where: { userId_gameId: { userId: bob.id, gameId: catan.id } },
      update: {},
      create: {
        userId: bob.id,
        gameId: catan.id,
        rating: 7,
        body: "Fun but can drag with 4+ players.",
      },
    }),
    prisma.review.upsert({
      where: { userId_gameId: { userId: bob.id, gameId: codenames.id } },
      update: {},
      create: {
        userId: bob.id,
        gameId: codenames.id,
        rating: 9,
        body: "Perfect party game. Works for any group size.",
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
