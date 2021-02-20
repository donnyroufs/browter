import { Router as ExpressRouter } from "express";
import { config } from "./Config";
import { HTTP_METHODS } from "./Constants";
import { OverrideHttpMethod } from "./OverrideHttpMethod";
import { IBrowter } from "./Types";

export function Browter(controllersDir: string = config.controllersDir) {
  const router = ExpressRouter();
  const controllers = require(controllersDir);

  HTTP_METHODS.forEach((verb) => OverrideHttpMethod(router, verb, controllers));

  return (router as unknown) as IBrowter;
}
