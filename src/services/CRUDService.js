import bcrypt from "bcryptjs";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.passWord);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phonenumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleID: data.role,
      });
      resolve("Create a new user succeed!");
    } catch (e) {
      reject(e);
    }
  });
};

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

let getAllUser = () => {
  return new Promise((relsove, reject) => {
    try {
      let user = db.User.findAll({
        raw: true,
      });
      relsove(user);
    } catch (e) {
      reject(e);
    }
  });
};
let getUserByInfoId = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let updateUserData = (putData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: putData.id },
      });
      if (user) {
        user.firstName = putData.firstName;
        user.lastName = putData.lastName;
        user.address = putData.address;

        await user.save();
        resolve();
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });
      if (user) {
        user.destroy();
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserByInfoId: getUserByInfoId,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};
