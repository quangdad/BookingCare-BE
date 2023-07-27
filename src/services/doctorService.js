import db from "../models/index";

let getTopDoctorHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limitInput,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        err: 0,
        data: users,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllDoctor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password"],
        },
      });
      resolve({
        err: 0,
        data: doctors,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let saveInfoDoctorService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.doctorId || !data.contentHTML || !data.contentMarkdown) {
        resolve({
          err: 1,
          mes: "Missing parameter!",
        });
      } else {
        await db.Editor.create({
          contentHTML: data.contentHTML,
          contentMarkdown: data.contentMarkdown,
          description: data.description,
          doctorId: data.doctorId,
        });
        resolve({
          err: 0,
          mes: "Save info succeed!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getInfoDoctor = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          err: 1,
          mes: "Missing parameter!",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: inputId },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Editor,
              attributes: ["description", "contentMarkdown", "contentHTML"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        resolve({
          err: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctor: getAllDoctor,
  saveInfoDoctorService: saveInfoDoctorService,
  getInfoDoctor: getInfoDoctor,
};
