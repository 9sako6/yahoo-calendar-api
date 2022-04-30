import { Cookie } from "@playwright/test";
import fs from "fs";
import axios from "axios";

void async function () {
  const cookies: Cookie[] = JSON.parse(
    fs.readFileSync("./cookies.json", "utf-8"),
  );

  axios.post("http://localhost:8080/api/v0/events/export", {
    cookies,
    year: 2022,
  }).then((res) => {
    console.log(res.data);
  }).catch((error) => {
    console.log(error.message);
    console.log(error.code);
  });
}();
