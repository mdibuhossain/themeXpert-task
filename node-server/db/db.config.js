import { PrismaClient, RoleType } from "@prisma/client";
import { encryptPass } from "../utils/utils.js";

const prisma = new PrismaClient({
  log: ["query", "error"],
});

async function main() {
  try {
    const email = "admin@admin.com";
    const findUser = await prisma.user.findUnique({
      where: { email },
    });
    if (findUser) {
      return;
    }
    await prisma.user.create({
      data: {
        email: "admin@admin.com",
        password: encryptPass("admin"),
        fullName: "SYSTEM ADMIN",
        role: RoleType.ADMIN,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    prisma.$disconnect();
  });

export default prisma;
