import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { nodeController } from "../controllers/node.controller.js";

const nodeRouter = Router();

nodeRouter.post("/", authMiddleware, nodeController.createNode);
nodeRouter.get("/:nid", authMiddleware, nodeController.getNode);

export default nodeRouter;
