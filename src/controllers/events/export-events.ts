import fs from "fs";
import { chromium, Cookie } from "@playwright/test";
import { exportIcs } from "~/scraping";
import { Request, Response } from "express";

export const exportEvents = async (req: Request, res: Response) => {
  const cookies: Cookie[] = req.body.cookies;
  const year = String(req.body.year);

  const browser = await chromium.launch();
  // The option `acceptDownloads` is necessary to download a file.
  const context = await browser.newContext({ acceptDownloads: true });
  await context.addCookies(cookies);

  const page = await context.newPage();
  const downloadPath = `tmp/yahoo-calendar-${Date.now()}.ics`;

  await exportIcs(page, year, downloadPath);
  await browser.close();

  const icsText = fs.readFileSync(downloadPath);

  if (!fs.existsSync(downloadPath)) {
    throw new Error("Fail to download an ics file from Yahoo! Calendar.");
  }

  fs.unlinkSync(downloadPath);

  // Send the file as text so that it is not downloaded on the client side.
  res.set({
    "Content-Type": "text/plain",
    "Content-Disposition": "inline",
  });
  res.send(icsText);
};
