import { Router } from "express";
import { oAuthCallback } from "./oAuthCallback";
import { gmailAuth } from "./gmailAuth";

const router = Router();

router.use("/gmailAuth", gmailAuth);
router.use("/oAuthCallback", oAuthCallback);

export const authRoutes = router;
