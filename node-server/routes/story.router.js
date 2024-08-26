import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { storyController } from "../controllers/story.controller.js";

const storyRouter = Router();

storyRouter.post("/", authMiddleware, storyController.createStory);
storyRouter.get("/", authMiddleware, storyController.getStories);
storyRouter.get("/:sid", authMiddleware, storyController.getStory);
storyRouter.put("/:sid/publish", authMiddleware, storyController.publishStory);

export default storyRouter;
