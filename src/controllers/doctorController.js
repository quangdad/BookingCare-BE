import doctorService from "../services/doctorService";

let getTopDoctorHome = async (res, req) => {
  let limit = res.query.limit;
  if (!limit) {
    limit = 10;
  }
  try {
    let response = await doctorService.getTopDoctorHome(+limit);
    return req.status(200).json(response);
  } catch (e) {
    console.log(e);
    return req.status(200).json({
      err: -1,
      mes: "Error from server",
    });
  }
};

let getAllDoctor = async (res, req) => {
  try {
    let doctors = await doctorService.getAllDoctor();
    return req.status(200).json(doctors);
  } catch (e) {
    console.log(e);
    return req.status(200).json({
      err: -1,
      mes: "Error from server",
    });
  }
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctor: getAllDoctor,
};
