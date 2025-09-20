import { PrismaClient, Role } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL!;
  if (!adminEmail) throw new Error("Set ADMIN_EMAIL in env");

  await prisma.user.upsert({
    where: { email: adminEmail },
    create: {
      email: adminEmail,
      name: "Admin",
      role: Role.ADMIN,
      provider: "local",
    },
    update: { role: Role.ADMIN },
  });
  console.log("Seeded admin:", adminEmail);

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
