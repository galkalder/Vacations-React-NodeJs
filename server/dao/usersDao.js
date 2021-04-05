const conection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function userRegistration(user) {
  let sql = "INSERT INTO users VALUES(?, ?, ?, ?, ?, ?)";
  let parameters = [
    null,
    user.userName,
    user.firstName,
    user.lastName,
    user.password,
    "user",
  ];
  try {
    conection.executeWithParameters(sql, parameters);
  } catch (e) {
    if (e.errno === 1062) {
      throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST, sql, e);
    }
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function getUserByUserName(userName) {
  let sql = "SELECT * FROM users WHERE userName = ?";
  let parameters = [userName];
  try {
    let userResponse = await conection.executeWithParameters(sql, parameters);
    return userResponse;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function userLogin(user) {
  let sql =
    "SELECT userId, userName, userType FROM users WHERE userName = ? && userPassword = ?";
  let parameters = [user.userName, user.password];
  try {
    let userResponse = await conection.executeWithParameters(sql, parameters);
    return userResponse[0];
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

module.exports = { userRegistration, getUserByUserName, userLogin };
