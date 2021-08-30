import { Router } from "express";
import { authMiddleware } from "./../../common";
import { getMessages } from "./getMessages";
const router = Router();

router.use("/getMessages", authMiddleware, getMessages);

export const gmailRoutes = router;
