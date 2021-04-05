let conection = require("./connection-wrapper");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

async function onClickFollow(vacationId, userId) {
    let sql = "INSERT INTO followed_vacations VALUES(?, ?)";
    let parameters = [
      userId,
      vacationId,
    ];
    try {
      await conection.executeWithParameters(sql, parameters);
      return "success";
    } catch (e) {
      if (e.errno === 1062) {
        return "fail";
    }
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

  async function onClickUnFollow(vacationId, userId) {
      let sql = "DELETE FROM followed_vacations WHERE user = ? AND vacation = ? ";
      let parameters = [
        userId,
        vacationId,
      ];
      try {
        await conection.executeWithParameters(sql, parameters);
        return "success";
      } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
      }
    }

module.exports = { onClickFollow, onClickUnFollow };