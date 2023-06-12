import userService from "../services/userService";
import db from "../models/index";

let handleLogin = async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    res.status(500).json({
      err: 1,
      mes: "Missing inputs parameter!",
    });
    return;
  } else {
    let userData = await userService.handleUserLogin(email, password);
    res.status(200).json({
      err: userData.err,
      mes: userData.mes,
      user: userData.user,
    });
    return;
  }

  next();
};
let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  console.log("id: ", id);
  let user = await userService.getAllUsers(id);
  console.log("user: ", user);
  if (id) {
    return res.status(200).json({
      err: 0,
      mes: "OK",
      user,
    });
  }
  return res.status(500).json({
    err: 1,
    mes: "Missing required parameter!",
    user: [],
  });
};

let handleCreateNewUser = async (req, res) => {
  let mes = await userService.createNewUser(req.body);
  return res.status(200).json(mes);
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  if (data) {
    console.log("check data controller", data);
    let mes = await userService.updateUser(data);
    return res.status(200).json(mes);
  }
};

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(500).json({
      err: 1,
      mes: "Mising required parameters!",
    });
  }
  let mes = await userService.deleteUser(req.body.id);
  return res.status(200).json(mes);
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
};
