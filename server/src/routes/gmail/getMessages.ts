import { google } from "googleapis";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import httpErrors from "http-errors";
import { writeToFile } from "../../common";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const parseMessage = require("gmail-api-parse-message");

const gmail = google.gmail("v1");
const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    try {
      const params = req.query;

      if (!params) {
        return next(httpErrors(400, "invalid request parameters"));
      }

      const messageList = await gmail.users.messages.list({
        userId: "me",
        ...params,
      });
      const messagIds = messageList.data.messages ?? [];
      const messages = await Promise.all(
        messagIds.map(async (message) => {
          const messageResponse = await gmail.users.messages.get({
            id: message.id ?? "",
            userId: "me",
          });

          const parsedMessage = parseMessage(messageResponse.data);
          return parsedMessage.textPlain?.split("\n>")?.[0];
        })
      );

      writeToFile(messages);
      return res
        .status(200)
        .send({ messages, nextPage: messageList.data.nextPageToken });
    } catch (e) {
      console.error(e);
      return next(httpErrors(400, { error: e }));
    }
  })
);

export const getMessages = router;
