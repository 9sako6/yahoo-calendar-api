import { Application } from "./deps.ts";
import { router } from "./router.ts";
const port = 8080;
const app = new Application();

app.addEventListener("listen", () => {
  console.log(`Listening on localhost:${port}`);
});

app.use(router.routes());

await app.listen({ port });
