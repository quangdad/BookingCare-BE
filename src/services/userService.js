import bcrypt from "bcryptjs";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (passWord) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(passWord, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "roleId", "password", "firstName", "lastName"],
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

let getAllUsers = (userId) => {
  return new Promise(async (resovle, reject) => {
    try {
      let user = "";
      if (userId === "ALL") {
        user = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        user = await db.User.findOne({
          where: { id: userId },
        });
      }
      resovle(user);
      console.log(user);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = async (data) => {
  console.log("test: ", data);

  return new Promise(async (resovle, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resovle({
          err: 1,
          mes: "Your email is already in used!",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.passWord);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender,
          roleID: data.role,
          positionId: data.position,
          image: data.avatar,
        });
        resovle({
          err: 0,
          mes: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = async (userId) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id: userId },
    });
    if (!user) {
      resolve({
        err: 2,
        mes: "User isn't exist",
      });
    }
    await db.User.destroy({
      where: { id: userId },
    });
    resolve({
      err: 0,
      mes: "The user has been deleted successfully",
    });
  });
};

let updateUser = async (putData) => {
  console.log("put data", putData);
  return new Promise(async (resolve, reject) => {
    try {
      if (!putData.id) {
        console.log("check data nodejs: ", putData);
        resolve({
          err: 2,
          mes: "User isn't exist",
        });
      }
      let user = await db.User.findOne({
        where: { id: putData.id },
        raw: false,
      });
      if (user) {
        user.firstName = putData.firstName;
        user.lastName = putData.lastName;
        user.address = putData.address;
        user.phonenumber = putData.phonenumber;
        user.gender = putData.gender;
        user.roleID = putData.roleId;
        user.positionId = putData.positionId;
        user.image = putData.avatar;
        await user.save();
        resolve({
          err: 0,
          mes: "The user has been updated successfully",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          err: 1,
          mes: "Missing required parameter!",
        });
      } else {
        let dataQuery = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        dataQuery.err = 0;
        dataQuery.data = allcode;
        resolve(dataQuery);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  getAllCodeService: getAllCodeService,
};
