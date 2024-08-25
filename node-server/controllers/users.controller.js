import prisma from "../db/db.config.js";
import { encryptPass } from "../utils/utils.js";

export class usersController {
  static async getUsers(req, res) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          fullName: true,
          stories: true,
          interactions: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }

  static async getUser(req, res) {
    try {
      const { uid } = req.params;
      const findUser = await prisma.user.findUnique({
        where: { id: parseInt(uid) },
        include: { stories: true, interactions: true },
      });
      if (!findUser) {
        return res.status(404).json({ errors: "User not found" });
      }
      const { password, ...rest } = findUser;
      return res.status(200).json(rest);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
}
