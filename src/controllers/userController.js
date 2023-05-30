import userService from "../services/userService";

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
  let id = req.body.id;
  console.log("id: ", id);
  let user = await userService.getAllUsers(id);
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

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
};
