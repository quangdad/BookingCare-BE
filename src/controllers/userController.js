import userService from "../services/userService";

let handleLogin = async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    res.status(500).json({
      // err: userData.err,
      // mes: userData.mes,
      // user: userData.user,
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
module.exports = {
  handleLogin: handleLogin,
};
