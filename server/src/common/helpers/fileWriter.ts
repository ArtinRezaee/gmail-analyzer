import { createWriteStream, existsSync, mkdirSync, rmdirSync } from "fs-extra";
export const writeToFile = (messages: string[]): void => {
  createDir("mails");
  messages.forEach((message, index) => {
    const writeStream = createWriteStream(`mails/mails${index}.md`);
    writeStream.write(`${message}\n`);

    writeStream.on("error", (e) => {
      throw new Error(e.message);
    });
    writeStream.end();
  });
};

export const createDir = (dirPath: string): void => {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath);
  }
};

export const removeDir = (dirPath: string): void => {
  rmdirSync(dirPath, { recursive: true });
};
