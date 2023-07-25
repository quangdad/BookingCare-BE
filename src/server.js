import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const corsOrigin = {
  origin: "http://localhost:3000", //or whatever port your frontend is using
  credentials: true,
  optionSuccessStatus: 200,
};
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With, content-type"
//   );
// });

app.use(cors(corsOrigin));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log("Backend is running on the port : " + port);
});
