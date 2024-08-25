import prisma from "../db/db.config.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jwt from "jsonwebtoken";
import { encryptPass } from "../utils/utils.js";

export class authController {
  static async register(req, res) {
    try {
      const { email, password, fullName } = req.body;
      await prisma.user.create({
        data: {
          email,
          password: encryptPass(password),
          fullName,
        },
      });
      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      return res.status(400).json({ errors: error.messages });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const findUser = await prisma.user.findUnique({
        where: { email },
        include: { stories: true, interactions: true },
      });
      if (!findUser) {
        return res.status(400).json({ errors: "Invalid credentials" });
      }
      if (!bcrypt.compareSync(password, findUser.password)) {
        return res.status(400).json({ errors: "Invalid credentials" });
      } else {
        const token = jwt.sign({ id: findUser.id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        return res.status(200).json({ message: "Login successful" });
      }
    } catch (error) {
      return res.status(400).json({ errors: error.messages });
    }
  }

  static async logout(req, res) {
    try {
      res.cookie("token", "", {
        maxAge: 1,
      });
      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      return res.status(500).json({ errors: error.messages });
    }
  }

  static async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const findUser = req.user;
      if (!bcrypt.compareSync(oldPassword, findUser.password)) {
        return res.status(400).json({ errors: "Invalid credentials" });
      } else {
        await prisma.user.update({
          where: { id: findUser.id },
          data: {
            password: encryptPass(newPassword),
          },
        });
        return res
          .status(200)
          .json({ message: "Password changed successfully" });
      }
    } catch (error) {
      return res.status(500).json({ errors: error.messages });
    }
  }
}
