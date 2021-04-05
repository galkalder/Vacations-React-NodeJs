const express = require("express");
const router = express.Router();
const vacationLogic = require("../logic/vacationLogic");
const fs = require("fs");

//Get all vacations
router.get("/", async (request, response, next) => {
  try {
    let authorizationString = request.headers["authorization"];
    let token = authorizationString.substring("Bearer ".length);
    let vacationResponse = await vacationLogic.allVacations(token);

    response.send(vacationResponse);
  } catch (error) {
    return next(error);
  }
});

//add vacation
router.post("/", async (request, response, next) => {
  try {
    let VacationData = request.body;
    let vacationId = await vacationLogic.addNewVacation(VacationData);
    response.send(vacationId);
  } catch (error) {
    return next(error);
  }
});

//Update vacation
router.put("/", async (request, response, next) => {
  try {
    let VacationData = request.body;
    await vacationLogic.changeOldVacation(VacationData);
    response.send(VacationData);
  } catch (error) {
    return next(error);
  }
});

//Delete vacation
router.delete("/", async (request, response, next) => {
  try {
    let imgForDelete = await vacationLogic.deleteVacation(
      request.query.vacationId
    );
    deletePicture(imgForDelete);
    response.send("success");
  } catch (error) {
    return next(error);
  }
});

function deletePicture(imgForDelete) {
  fs.unlinkSync("./uploads/" + imgForDelete);
  console.log("File deleted");
}

// file upload
const multer = require("multer");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //YOUR PATH IN GREEN
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
let upload = multer({ storage: storage }).single("file");
router.post("/upload", function (request, response) {
  upload(request, response, function (error) {
    if (request.file == undefined) {
      response.send("must add a photo");
      return;
    }
    if (error instanceof multer.MulterError) {
      console.log(error);
      return;
    } else if (error) {
      console.log(error);
      return;
    }
    request.file.filename = "http://localhost:3001/" + request.file.filename;

    return response.status(200).send(request.file.filename);
  });
});

module.exports = router;
