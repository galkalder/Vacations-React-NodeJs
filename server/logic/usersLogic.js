const express = require("express");
const usersDao = require("../dao/usersDao");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
const usersCache = require("../models/usersCache");
const crypto = require("crypto");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

async function userLogin(user) {
  const saltRight = "sdfsd%43flkjfo";
  const saltLeft = "!9dsdon$#f3ws";
  const hashPassword = crypto
    .createHash("md5")
    .update(saltLeft + user.password + saltRight)
    .digest("hex");
  user.password = hashPassword;
  let userResponse = await usersDao.userLogin(user);
  if (userResponse === null || userResponse.length == 0) {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }
  const token = jwt.sign({ sub: user.userName }, config.secret);
  const userCacheData = {
    userId: userResponse.userId,
    userName: userResponse.userName,
    userType: userResponse.userType,
  };
  usersCache.set(token, userCacheData);
  loginServerResponse = {
    token: token,
    userType: userResponse.userType,
    userName: userResponse.userName,
  };
  return loginServerResponse;
}

async function autoLogin(data) {
  const user = usersCache.get(data.token);
  if (user == null) {
    throw new ServerError(ErrorType.SOCKET_ERROR);
  }
  return {
    userName: user.userName,
    userType: user.userType,
  };
}

function logOutFunction(token) {
  if (usersCache.get(token.token)) {
    usersCache.delete(token.token);
  } else {
    throw new ServerError(ErrorType.SOCKET_ERROR);
  }
}

async function allVacations() {
  let vacationResponse = await usersDao.allVacations();
  return vacationResponse;
}

async function userRegistration(user) {
  let response = await usersDao.getUserByUserName(user.userName);
  if (response.length > 0) {
    throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
  }
  const saltRight = "sdfsd%43flkjfo";
  const saltLeft = "!9dsdon$#f3ws";
  const hashPassword = crypto
    .createHash("md5")
    .update(saltLeft + user.password + saltRight)
    .digest("hex");
  user.password = hashPassword;
  await usersDao.userRegistration(user);
}

module.exports = {
  userRegistration,
  userLogin,
  allVacations,
  autoLogin,
  logOutFunction,
};
