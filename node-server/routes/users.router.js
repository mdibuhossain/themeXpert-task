import { Router } from "express";
import { usersController } from "../controllers/users.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", authMiddleware, roleMiddleware.isAdmin, usersController.getUsers);
userRouter.get("/:uid", authMiddleware, roleMiddleware.isAdmin, usersController.getUser);

export default userRouter;
