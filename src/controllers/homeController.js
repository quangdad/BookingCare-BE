import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};
let getaboutPage = (req, res) => {
  return res.render("test/about.ejs");
};
let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send("Post crud from server");
};
let displayCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  // console.log("------------------");
  // console.log(data);
  // console.log("------------------");
  return res.render("DisplayCRUD.ejs", {
    dataTable: data,
  });
};
let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserByInfoId(userId);
    return res.render("editCRUD.ejs", {
      dataTable: userData,
    });
  } else {
    return res.send("User not found!");
  }
};
let updateCRUD = async (req, res) => {
  let putData = req.body;
  await CRUDService.updateUserData(putData);
  return res.send("Update done");
};
let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDService.deleteUserById(id);
    return res.send("Delete User succeed");
  } else {
    return res.send("User not found");
  }
};
module.exports = {
  getHomePage: getHomePage,
  getaboutPage: getaboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayCRUD: displayCRUD,
  getEditCRUD: getEditCRUD,
  updateCRUD: updateCRUD,
  deleteCRUD: deleteCRUD,
};
