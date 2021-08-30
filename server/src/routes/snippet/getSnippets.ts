import { Router } from "express";
import asyncHandler from "express-async-handler";
import httpErrors from "http-errors";
import { detectClones } from "jscpd";
import _ from "lodash";
import { removeDir } from "../../common";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stringAlgo = require("string-algorithms");

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    try {
      const clones = await detectClones({
        path: ["/Users/Artin/Desktop/Projects/Text Blaze/server/mails"],
        silent: true,
        format: ["markdown"],
        minTokens: 8,
        minLines: 1,
        ignoreCase: true,
      });
      const parsedClones = clones.map((clone) => {
        return stringAlgo.longestCommonSubstring([
          clone.duplicationA.fragment?.replace(/(\r\n|\n|\r)/gm, "") ?? "",
          clone.duplicationB.fragment?.replace(/(\r\n|\n|\r)/gm, "") ?? "",
        ])[0];
      });
      const messages = _.uniq(parsedClones);
      removeDir("mails");
      res.status(200).send({ messages });
    } catch (e) {
      return next(httpErrors(500, { error: e }));
    }
  })
);

export const getSnippets = router;

export default getSnippets;
