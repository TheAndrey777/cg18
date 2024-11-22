import express, { Application } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";
import { authRouter } from "./routes/auth.router";
import "./strategies/jwt.strategy";

const app: Application = express();

app.use(cors({ credentials: true }));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/auth", authRouter);

app.use(errorHandler);

export default app;