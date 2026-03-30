import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const managerRole = await prisma.role.upsert({
    where: { name: "Manager" },
    update: {},
    create: { name: "Manager" },
  });

  const developerRole = await prisma.role.upsert({
    where: { name: "Developer" },
    update: {},
    create: { name: "Developer" },
  });

  const designerRole = await prisma.role.upsert({
    where: { name: "Designer" },
    update: {},
    create: { name: "Designer" },
  });

  await prisma.employee.upsert({
    where: { firstName_lastName: { firstName: "Alice", lastName: "Carter" } },
    update: {},
    create: {
      firstName: "Alice",
      lastName: "Carter",
      roleId: managerRole.id,
    },
  });

  await prisma.employee.upsert({
    where: { firstName_lastName: { firstName: "Ben", lastName: "Lopez" } },
    update: {},
    create: {
      firstName: "Ben",
      lastName: "Lopez",
      roleId: developerRole.id,
    },
  });

  await prisma.employee.upsert({
    where: { firstName_lastName: { firstName: "Cara", lastName: "Nguyen" } },
    update: {},
    create: {
      firstName: "Cara",
      lastName: "Nguyen",
      roleId: designerRole.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });