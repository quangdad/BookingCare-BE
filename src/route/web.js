import express from "express";
import homeController from "../controllers/homeController.js";
import userController from "../controllers/userController.js";

let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getaboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/crud-post", homeController.postCRUD);
  router.get("/get-crud", homeController.displayCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/update-crud", homeController.updateCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);

  // router.get("/home", (req, res) => {
  //   return res.send("Welcome");
  // });

  return app.use("/", router);
};

module.exports = initWebRoutes;
