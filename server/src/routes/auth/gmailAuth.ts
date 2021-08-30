import { Router } from "express";
import asyncHandler from "express-async-handler";
import httpErrors from "http-errors";
import { isAuthorized, getNewAuthToken } from "./helpers/authHelpers";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    try {
      const authenticated = await isAuthorized();

      if (!authenticated) {
        const authorizationUrl = getNewAuthToken();
        return res
          .status(200)
          .send({ authorizationUrl, message: "Not Authorized" });
      }

      return res
        .status(200)
        .send({ message: "Authenticated", authorizationUrl: "" });
    } catch (e) {
      console.error(e);
      return next(httpErrors(500, { error: e }));
    }
  })
);

export const gmailAuth = router;
