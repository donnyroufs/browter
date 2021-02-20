![example](https://i.imgur.com/IHBvzm7.png)

# Getting Started with Browter

**Browter** gives the default Express Router some extra juice,
at this moment it hasn't been tested in a real project nor does it
have tests, so please wait till we've reached **0.2.0**

- Grouping routes
- Binding route handlers thru controllers with a string format.
- Wraps your controllers to catch any async errors.
- Resourceful routes (W.I.P)
- Have all your routes in one file with no import boilerplate!
- Built on Typescript

---

**install browter**

```
yarn add @donnyroufs/browter
```

```ts
import "@donnyroufs/browter";

import express, { Router } from "express";

const app = express();
const apiRouter = Router();

apiRouter.group("users", (router) => {
  router.get("/", "UserController.index");
});

apiRouter.group("posts", (router) => {
  router.get("/", "PostController.index");
  router.post("/", "PostController.store");
});

app.use("/api/v1", apiRouter);

app.listen(5000, () => console.log("Server running on: http://localhost:5000"));
```

## Features

- [x] Automatically bind controllers with their routes
- [x] Group routes
- [x] Nested Grouping
- [ ] Scaffold resourceful routes

## Milestone 0.2

- [x] Create an express router wrapper
- [x] Allow to create routes which dynamically find the controller methods
- [x] Set middleware for each route
- [x] Set default Path for controllers
- [x] Group Routes
- [x] Fix types
- [ ] Add tests
- [ ] Add JSDocs

## Milestone 0.3

_Nested Grouping of routes_

## Milestone 0.4

_Scaffold resourceful routes_

## Milestone 0.5

_Support for other routers_
_Create an express factory that returns the modified version_

# API

## Router.group

> Router[GET | POST | PATCH | PUT | DELETE | HEAD | ALL]

```ts
const router = express.Router();

router.group("/users", (router) => {
  router.get("/", "UserController.index");
  router.get("/:id", "UserController.show", [withUserMiddleware]);
});
```

## Router.resource (milestone 0.4.0)

```ts
router.resource("users", "UserController");
/*
  [GET] /users              -  UserController.index
  [POST] /users             -  UserController.store
  [GET] /users/:id          -  UserController.show
  [PATCH/PUT] /users/:id    -  UserController.update
  [DELETE] /users/:id       -  UserController.destroy
*/
```

## Controllers Path

By default it loads the controllers from "**Api/Controllers/index**",
if you prefer a different location then you can change it like so:

**NOTE:** It requires a singleton with a named export

```ts
import { setRouterConfig } from "@donnyroufs/browter";

setRouterConfig({
  controllersDir: "App/Api/Controllers/Http/index",
});
```

# Examples

## Folder Structure

**Browter** is built on top of this folder structure, however you can change it to anything you prefer.

```
>  src
  >  Api
    >  Controllers
      > index.ts
      > Http
        > User.controller.ts
  >  Bootstrap.ts
  >  Routes.ts
```

## Routes.ts

**Without nested grouping**

```ts
import { Router } from "express";
import {
  ExampleMiddleware,
  GlobalExampleMiddleware,
} from "./Middleware/ExampleMiddleware";

const router = Router();

router.group("/users", (router) => {
  router.use(GlobalExampleMiddleware);

  router.get("/", "UserController.index", [ExampleMiddleware]);
  router.post("/", "UserController.store");
  router.get("/:id", "UserController.show", [ExampleMiddleware]);
  router.patch("/:id", "UserController.update");
  router.delete("/:id", "UserController.destroy");
});

router.group("/posts", (router) => {
  router.get("/", "PostController.index", [ExampleMiddleware]);
});

export default router;
```

**Nested Grouping**

```ts
router.group("/users", (router) => {
  router.use(GlobalExampleMiddleware);

  router.get("/", "UserController.index", [ExampleMiddleware]);
  router.post("/", "UserController.store");
  router.get("/:id", "UserController.show", [ExampleMiddleware]);
  router.patch("/:id", "UserController.update");
  router.delete("/:id", "UserController.destroy");

  router.group("/posts", (router) => {
    router.get("/", "PostController.index");
  });
});
```
