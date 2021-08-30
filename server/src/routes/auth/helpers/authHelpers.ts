import path from "path";
import fs, { pathExists } from "fs-extra";
import { Credentials, OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
const TOKEN_PATH = path.join(__dirname, "../../../../token.json");

export const isAuthorized = async (): Promise<boolean> => {
  const exists = await pathExists(TOKEN_PATH);
  const token = exists ? await fs.readFile(TOKEN_PATH, "utf8") : "";

  if (token) {
    authenticate(JSON.parse(token));
    return true;
  }

  return false;
};

export const getNewAuthToken = (): string => {
  const oAuthClient = getOAthClient();

  return oAuthClient.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
  });
};

export const saveToken = async (token: Credentials): Promise<void> => {
  await fs.writeFile(TOKEN_PATH, JSON.stringify(token));
};

export const getOAthClient = (): OAuth2Client => {
  const { client_id, client_secret, redirect_uris } = JSON.parse(
    process.env.GMAIL_CONFIG ?? ""
  );
  return new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
};

const authenticate = (token: Credentials): void => {
  const oAuthClient = getOAthClient();

  oAuthClient.setCredentials(token);
  google.options({
    auth: oAuthClient,
  });
};
