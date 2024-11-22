import express, { Application } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";
import { authRouter } from "./routes/auth.router";
import "./strategies/jwt.strategy";
import { officeRouter } from "./routes/office.router";

const app: Application = express();

const origins = process.env.NODE_ENV == "development" ? 
  [ "http://192.168.0.108:5173", "http://localhost:5173", "http://localhost:8000", "http://82.146.43.148" ] : [];

app.use(cors({ origin: origins, credentials: true }));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/auth", authRouter);
app.use("/api/office", officeRouter);

app.use(errorHandler);

export default app;