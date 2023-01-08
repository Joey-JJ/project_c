import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import process from "process";
import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";
const fs = require("fs").promises;

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
  const TOKEN_PATH = path.join(process.cwd(), "token.json");
  const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

  async function loadSavedCredentialsIfExist() {
    try {
      const content = await fs.readFile(TOKEN_PATH);
      const credentials = JSON.parse(content);
      return google.auth.fromJSON(credentials);
    } catch (err) {
      return null;
    }
  }

  async function saveCredentials(client: any) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: "authorized_user",
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
  }

  async function authorize() {
    let client: any = await loadSavedCredentialsIfExist();
    if (client) {
      return client;
    }
    client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
      await saveCredentials(client);
    }
    return client;
  }

  async function listEmails(auth: any) {
    const gmail = google.gmail({ version: "v1", auth });
    const res = await gmail.users.threads.list({
      userId: "me",
    });

    if (res.data.threads) {
      return res.data.threads;
    }
  }

  authorize()
    .then(listEmails)
    .then((data) => res.status(200).json(data))
    .catch((_) => res.status(500).json({ error: "Couldnt fetch emails" }));

  return;
};

export default handler;
