import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../db/db.config.js";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  const token = req.cookies["token"];
  console.log(token);
  if (token === null || token === undefined) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const findUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { stories: true, interactions: true },
    });
    if (!findUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = findUser;
    next();
  });
};
