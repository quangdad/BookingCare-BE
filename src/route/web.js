import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getaboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/crud-post", homeController.postCRUD);

  router.get("/home", (req, res) => {
    return res.send("Welcome");
  });

  return app.use("/", router);
};

module.exports = initWebRoutes;
