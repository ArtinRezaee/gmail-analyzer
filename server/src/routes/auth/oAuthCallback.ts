import { Router } from "express";
import asyncHandler from "express-async-handler";
import httpErrors from "http-errors";
import { getOAthClient, saveToken } from "./helpers/authHelpers";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    try {
      const query = req.query;

      if (!query) {
        return next(httpErrors(400, "invalid request query"));
      }

      const { code } = query;

      const oAuthClinet = getOAthClient();
      const { tokens } = await oAuthClinet.getToken(code as string);
      await saveToken(tokens);

      return res.status(200).send("<script>window.close();</script>");
    } catch (e) {
      return next(httpErrors(500, { error: e }));
    }
  })
);

export const oAuthCallback = router;
