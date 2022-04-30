import { Router } from "express";
import { router } from "../router";

type Layer = {
  route?: {
    path: string;
  };
};

export const listRoutes = (router: Router) =>
  router.stack.map((layer: Layer) => layer.route?.path).filter<string>((
    path,
  ): path is string => typeof path === "string");

console.log(listRoutes(router));
