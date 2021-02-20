# Getting Started with Browter

Browter gives the default Express Router some extra juice

- Grouping routes
- Binding route handlers thru controllers with a string format.
- Resourceful routes (W.I.P)

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
- [ ] Nested Grouping
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
router.group("/users", (router) => {
  router.get("/", "UserController.index");
  router.get("/:id", "UserController.show", [withUserMiddleware]);
});
```

## Router.resource (upcoming)

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
