const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const password = bcrypt.hashSync("123456");
const customersData = [
  { username: "andy", password, email: "andy@ggg.mail" },
  { username: "bobby", password, email: "bobby@ggg.mail" },
  { username: "candy", password, email: "candy@ggg.mail" },
];

const run = async () => {
  try {
    await prisma.customers.createMany({
      data: customersData,
    });
    console.log("Seed successful!");
  } catch (error) {
    console.error("Seed failed with error:", error);
  } finally {
    await prisma.$disconnect();
  }
};

run();
