import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.get("/logout", authMiddleware, authController.logout);
authRouter.put("/change-password", authMiddleware, authController.changePassword);

export default authRouter;
