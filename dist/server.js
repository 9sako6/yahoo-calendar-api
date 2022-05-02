"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var express = require("express");
var compression = require("compression");
var winston = require("winston");
var ws = require("ws");
var test = require("@playwright/test");
var fs = require("fs");
var http = require("http");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
function _interopNamespace(e) {
  if (e && e.__esModule)
    return e;
  var n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    Object.keys(e).forEach(function(k) {
      if (k !== "default") {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function() {
            return e[k];
          }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}
var express__default = /* @__PURE__ */ _interopDefaultLegacy(express);
var compression__default = /* @__PURE__ */ _interopDefaultLegacy(compression);
var winston__namespace = /* @__PURE__ */ _interopNamespace(winston);
var fs__default = /* @__PURE__ */ _interopDefaultLegacy(fs);
var http__default = /* @__PURE__ */ _interopDefaultLegacy(http);
const logger = winston__namespace.createLogger({
  level: "info",
  format: winston__namespace.format.json(),
  transports: [
    new winston__namespace.transports.File({ filename: "log/error.log", level: "error" }),
    new winston__namespace.transports.File({ filename: "log/development.log" })
  ]
});
const handleAccessLog = (req, _, next) => {
  logger.info(`Path: ${req.url}, Time: ${new Date()}`);
  next();
};
const createExpressApplication = () => {
  const app2 = express__default["default"]();
  app2.use(compression__default["default"]({
    threshold: 1e3
  }));
  app2.use(handleAccessLog);
  app2.use(express__default["default"].json());
  app2.use(express__default["default"].urlencoded({ extended: true }));
  return app2;
};
function hasProperty(obj, key) {
  return obj instanceof Object && key in obj;
}
const isRequestValid = (req) => {
  if (hasProperty(req, "action") && hasProperty(req, "message") && (req.action === "userid" || req.action === "code") && typeof req.message === "string") {
    return true;
  } else {
    return false;
  }
};
const validationErrors = (req) => {
  const errorMessages = [];
  if (req === null) {
    return ["Request is null."];
  }
  if (!hasProperty(req, "action")) {
    errorMessages.push("action property is missing.");
  } else if (!(req.action === "userid" || req.action === "code")) {
    errorMessages.push("action property has invalid value.");
  }
  if (!hasProperty(req, "message")) {
    errorMessages.push("message property is missing.");
  }
  return errorMessages;
};
const Debug = {
  saveScreenshot: async (page, fileName) => {
    if (process.env.SCREENSHOT) {
      const path = `./screenshots/${fileName}`;
      await page.screenshot({ path });
    }
  }
};
const submitUserId = async (page, userId) => {
  await Debug.saveScreenshot(page, "submit-userid:before-userid-input.png");
  await page.type('input[placeholder="ID/\u643A\u5E2F\u96FB\u8A71\u756A\u53F7/\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9"]', userId);
  await Debug.saveScreenshot(page, "submit-userid:after-userid-input.png");
  await page.locator('xpath=//button[contains(., "\u6B21\u3078")]').click();
  await page.locator('input[placeholder="\u78BA\u8A8D\u30B3\u30FC\u30C9"]').waitFor({
    state: "visible"
  });
  await Debug.saveScreenshot(page, "submit-userid:after-userid-submit.png");
  return true;
};
const submitConfirmationCode = async (context, page, code) => {
  await Debug.saveScreenshot(page, "submit-confirmation-code:before-code-input.png");
  await page.type('input[placeholder="\u78BA\u8A8D\u30B3\u30FC\u30C9"]', code);
  await Debug.saveScreenshot(page, "submit-confirmation-code:after-code-input.png");
  await page.locator('xpath=//button[contains(., "\u30ED\u30B0\u30A4\u30F3")]').click();
  await Debug.saveScreenshot(page, "submit-confirmation-code:after-code-submit-click.png");
  await page.waitForURL(new RegExp("/.*calendar.yahoo.co.jp.*"));
  await Debug.saveScreenshot(page, "submit-confirmation-code:after-code-submit.png");
  return await context.cookies();
};
const YAHOO_LOGIN_URL = "https://calendar.yahoo.co.jp/";
const handleUserId = async (ws2, page, userId) => {
  await page.goto(YAHOO_LOGIN_URL);
  const success = await submitUserId(page, userId);
  if (success) {
    const successMessage = {
      type: "message",
      message: "A confirmation code was sended."
    };
    ws2.send(JSON.stringify(successMessage));
  } else {
    const errorMessage = {
      type: "error",
      message: "Fail to send a confirmation code."
    };
    ws2.send(JSON.stringify(errorMessage));
  }
};
const handleConfirmationCode = async (ws2, browser, context, page, code) => {
  const cookies = await submitConfirmationCode(context, page, code);
  browser.close();
  const successMessage = {
    type: "cookies",
    message: cookies
  };
  ws2.send(JSON.stringify(successMessage));
};
const handleMessage = async (ws2, browser, context, page, data) => {
  let request;
  try {
    request = JSON.parse(data.toString());
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = {
        type: "error",
        message: error.message
      };
      ws2.send(JSON.stringify(errorMessage));
    }
    return;
  }
  if (!isRequestValid(request)) {
    const errorMessage = {
      type: "error",
      message: validationErrors(request).join(" ")
    };
    ws2.send(JSON.stringify(errorMessage));
    return;
  }
  const { action, message } = request;
  if (action === "userid") {
    await handleUserId(ws2, page, message);
  } else if (action === "code") {
    await handleConfirmationCode(ws2, browser, context, page, message);
  }
};
const handleClose = async (ws2, browser) => {
  await browser.close();
  ws2.close();
};
const handleError = async (ws2, browser, error) => {
  await browser.close();
  const errorMessage = {
    type: "error",
    message: error.message
  };
  ws2.send(JSON.stringify(errorMessage));
  ws2.close();
};
const handleOpen = (ws2, browser, context, page) => {
  ws2.on("message", (data) => handleMessage(ws2, browser, context, page, data));
  ws2.on("close", () => handleClose(ws2, browser));
  ws2.on("error", (error) => handleError(ws2, browser, error));
  const openMessage = {
    type: "message",
    message: "Info: Connection is established."
  };
  ws2.send(JSON.stringify(openMessage));
};
const WEB_SOCKET_PATH = `/api/v0/login`;
const handleUpgrade = async (request, socket, head) => {
  const browser = await test.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const webSocket = new ws.WebSocketServer({ noServer: true });
  webSocket.on("connection", (ws2) => handleOpen(ws2, browser, context, page));
  if (request.url === WEB_SOCKET_PATH) {
    webSocket.handleUpgrade(request, socket, head, (ws2) => {
      webSocket.emit("connection", ws2, request);
    });
  } else {
    socket.destroy();
  }
};
const root = (_, res) => {
  res.json({
    message: "Welcome to Yahoo! Calendar API. https://github.com/9sako6/yahoo-calendar-api"
  });
};
const downloadFile = async ({ page, downloaderSelector, downloadPath }) => {
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.locator(downloaderSelector).click()
  ]);
  await download.saveAs(downloadPath);
};
const exportIcs = async (page, year, downloadPath) => {
  await page.goto("https://calendar.yahoo.co.jp/event/export");
  await Debug.saveScreenshot(page, "ics:after-page-access.png");
  await page.type('input[placeholder="\u5E74\u3092\u5165\u529B"]', year);
  await Debug.saveScreenshot(page, "ics:after-year-input.png");
  await downloadFile({
    page,
    downloaderSelector: 'xpath=//button[contains(., "\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9")]',
    downloadPath
  });
};
const exportEvents = async (req, res) => {
  const cookies = req.body.cookies;
  const year = String(req.body.year);
  const browser = await test.chromium.launch();
  const context = await browser.newContext({ acceptDownloads: true });
  await context.addCookies(cookies);
  const page = await context.newPage();
  const downloadPath = `tmp/yahoo-calendar-${Date.now()}.ics`;
  await exportIcs(page, year, downloadPath);
  await browser.close();
  const icsText = fs__default["default"].readFileSync(downloadPath);
  if (!fs__default["default"].existsSync(downloadPath)) {
    throw new Error("Fail to download an ics file from Yahoo! Calendar.");
  }
  fs__default["default"].unlinkSync(downloadPath);
  res.set({
    "Content-Type": "text/plain",
    "Content-Disposition": "inline"
  });
  res.send(icsText);
};
const router = express.Router();
router.get("/", root);
router.post("/events/export", exportEvents);
const API_VERSION = "v0";
const API_ENDPOINT = `/api/${API_VERSION}`;
const app = createExpressApplication();
app.use(API_ENDPOINT, router);
const server = http__default["default"].createServer(app);
server.on("upgrade", (req, socket, head) => handleUpgrade(req, socket, head));
const port = process.env.PORT || 8080;
if (process.env.NODE_ENV === "production") {
  server.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
  });
}
const viteNodeApp = app;
exports.app = app;
exports.viteNodeApp = viteNodeApp;
