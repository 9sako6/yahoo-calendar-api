import puppeteer from "puppeteer";

export const openBrowserAndPage = async () => {
  const browser = await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-dev-shm-usage",
    ],
  });
  const page = await browser.newPage();

  return { browser, page };
};
