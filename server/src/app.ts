import express from "express";
import cors from "cors";
import asyncHandler from "express-async-handler";
import bodyParser from "body-parser";
import { snippetRoutes } from "./routes/snippet/snippet";
import { authRoutes } from "./routes/auth/auth";
import { gmailRoutes } from "./routes/gmail/gmail";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  "/",
  asyncHandler(async (req, res, next) => {
    next();
  })
);

app.use("/auth", authRoutes);
app.use("/gmail", gmailRoutes);
app.use("/snippets", snippetRoutes);

export default app;
