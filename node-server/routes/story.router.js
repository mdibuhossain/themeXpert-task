import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { storyController } from "../controllers/story.controller.js";

const storyRouter = Router();

storyRouter.get("/", authMiddleware, storyController.getStories);
storyRouter.get("/:sid", authMiddleware, storyController.getStory);

export default storyRouter;
