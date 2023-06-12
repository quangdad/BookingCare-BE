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
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);

  return app.use("/", router);
};

module.exports = initWebRoutes;
