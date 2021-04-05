const express = require("express");
const router = express.Router();
const usersLogic = require("../logic/usersLogic");

// Registration user
router.post("/register", async (request, response, next) => {
  let userData = request.body;
  try {
    let responseSql = await usersLogic.userRegistration(userData);
    if (responseSql == "user name is already used") {
      response.send("user name is already used");
    } else response.send("ok");
  } catch (error) {
    return next(error);
  }
});

// Login
router.post("/login", async (request, response, next) => {
  let userData = request.body;
  try {
    let userLoginResponse = await usersLogic.userLogin(userData);
    response.json(userLoginResponse);
  } catch (error) {
    return next(error);
  }
});

// autoLogin
router.post("/autologin", async (request, response, next) => {
  let token = request.body;
  try {
    let user = await usersLogic.autoLogin(token);
    response.json(user);
  } catch (error) {
    return next(error);
  }
});

// logout
router.post("/logout", async (request, response, next) => {
  try {
    let token = request.body;
    usersLogic.logOutFunction(token);
    response.send("success");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
