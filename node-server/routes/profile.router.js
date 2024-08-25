import { Router } from "express";
import { profileController } from "../controllers/profileController.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const profileRouter = Router();

profileRouter.get("/", authMiddleware, profileController.getProfiles);
profileRouter.put("/", authMiddleware, profileController.updateProfile);

export default profileRouter;
