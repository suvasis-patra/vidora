import express from "express";
import cookieParser from "cookie-parser";

import videoRouter from "./routes/video.route";
import userRouter from "./routes/user.route";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/video", videoRouter);

app.use(errorHandler);

export { app };
