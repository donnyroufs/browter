// import {} from "../../express-custom-router-examples/milestone01/src/";
import { setRouterConfig } from "./index";
import { Router } from "express";

const app = require("express")();

const router = Router();

setRouterConfig({
  controllersDir:
    "../../express-custom-router-examples/milestone01/src/Api/Controllers",
});

router.group("/users", (router) => {
  router.get("/", "UserController.index");
});

app.use(router);
app.listen(5000);
