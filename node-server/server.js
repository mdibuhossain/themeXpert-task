import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import formData from "express-form-data";
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/users.router.js";
import profileRouter from "./routes/profile.router.js";
import storyRouter from "./routes/story.router.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(formData.parse());
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/stories", storyRouter);
app.use("/api/profile", profileRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("server is running!");
});
