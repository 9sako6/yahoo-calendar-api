import { Application, Router } from "oak";

export const setupServer = (
  port: number,
  abortController: AbortController,
  router: Router,
) => {
  const app = new Application();
  const { signal } = abortController;

  app.use(router.routes());

  app.listen({ port, signal });
};

export const closeServer = (abortController: AbortController) => {
  abortController.abort();
};
