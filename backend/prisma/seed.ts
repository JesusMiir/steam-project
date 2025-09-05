import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.game.createMany({
    data: [
      { title: "Doom", description: "Classic FPS", price: 19.99, genre: "FPS" },
      {
        title: "Stardew Valley",
        description: "Farming & chill",
        price: 13.99,
        genre: "Sim",
      },
      {
        title: "Hades",
        description: "Rogue-like action",
        price: 24.99,
        genre: "Action",
      },
    ],
    skipDuplicates: true,
  });
}
main().finally(() => prisma.$disconnect());
