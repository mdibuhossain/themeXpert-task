import prisma from "../db/db.config.js";

export class profileController {
  static async getProfiles(req, res) {
    try {
      const findUser = req.user;
      const { password, ...rest } = findUser;
      res.status(200).json(rest);
    } catch (error) {
      res.status(500).json({ errors: error.message });
    }
  }
  static async updateProfile(req, res) {
    try {
      const findUser = req.user;
      const { fullName } = req.body;
      const updatedUser = await prisma.user.update({
        where: { id: findUser.id },
        data: { fullName },
      });
      const { password, ...rest } = updatedUser;
      return res.status(201).json(rest);
    } catch (error) {
      res.status(500).json({ errors: error.message });
    }
  }
}
