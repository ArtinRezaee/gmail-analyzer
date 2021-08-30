import { Router } from "express";
import { getSnippets } from "./getSnippets";
import { authMiddleware } from "./../../common";
const router = Router();

router.use("/getSnippets", authMiddleware, getSnippets);

export const snippetRoutes = router;
