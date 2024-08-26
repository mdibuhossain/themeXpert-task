import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { profileController } from "../controllers/profileController.js";

const profileRouter = Router();

profileRouter.get("/", authMiddleware, profileController.getProfiles);
profileRouter.put("/", authMiddleware, profileController.updateProfile);

export default profileRouter;
