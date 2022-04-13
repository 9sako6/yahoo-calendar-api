import { Application } from "./deps.ts";
import { router } from "./router.ts";
import { oakCors } from "./deps.ts";

const port = 8080;
const app = new Application();

app.addEventListener("listen", () => {
  console.log(`Listening on localhost:${port}`);
});

app.use(router.routes());
app.use(oakCors());

await app.listen({ port });
