import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { choiceController } from "../controllers/choice.controller.js";

const choiceRouter = Router();

choiceRouter.post("/", authMiddleware, choiceController.createChoice);
choiceRouter.get("/:cid", authMiddleware, choiceController.getChoice);

export default choiceRouter;
