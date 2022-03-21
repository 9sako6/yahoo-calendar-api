import puppeteer from "https://deno.land/x/puppeteer@9.0.2/mod.ts";

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
