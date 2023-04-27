import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "roleId", "password"],
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password); // false
          if (check) {
            // console.log(user);
            delete user.password,
              (userData = {
                err: 0,
                mes: "Ok",
                user: user,
              });
          } else {
            userData = {
              err: 3,
              mes: "Usename or password not correct",
            };
          }
        } else {
          userData = {
            err: 2,
            mes: "User not found",
          };
        }
        resolve(userData);
      } else {
        userData = {
          err: 1,
          mes: "Usename or password not correct",
        };
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
};
