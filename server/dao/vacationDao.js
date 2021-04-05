let conection = require("./connection-wrapper");

async function allVacations(userId) {
  let sql =
    "SELECT vacations.*, followed_vacations.user AS follow, (SELECT COUNT(*) FROM followed_vacations WHERE vacation = vacations.vacationId) AS followers FROM vacations LEFT JOIN followed_vacations  ON vacations.vacationId=followed_vacations.vacation && followed_vacations.user=? ORDER BY  followed_vacations.user DESC";

  let parameters = [userId];
  try {
    let vacationResponse = await conection.executeWithParameters(
      sql,
      parameters
    );
    return vacationResponse;
  } catch (e) {
    throw new ServerError(ErrorType.NO_VACATIONS_DATA);
  }
}

async function addNewVacation(vacation) {
  let sql = "INSERT INTO vacations VALUES(?, ?, ?, ?, ?, ?)";
  let parameters = [
    null,
    vacation.description,
    vacation.price,
    vacation.imgUrl,
    vacation.startDate,
    vacation.endDate,
  ];
  try {
    await conection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function changeOldVacation(vacation) {
  let sql =
    "UPDATE vacations SET description = ?, price = ? , imgUrl = ?, startDate = ?, endDate = ? WHERE vacationId = ?";
  let parameters = [
    vacation.description,
    vacation.price,
    vacation.imgUrl,
    vacation.startDate,
    vacation.endDate,
    vacation.vacationId,
  ];
  try {
    conection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function getImgForDelete(vacationId) {
  let sql = "SELECT imgUrl FROM vacations WHERE vacationId = ?";
  let parameters = [vacationId];
  try {
    let imgForDelete = await conection.executeWithParameters(sql, parameters);
    return imgForDelete[0].imgUrl;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function deleteVacation(vacationId) {
  let sql = "DELETE FROM vacations WHERE vacationId = ?";
  let parameters = [vacationId];
  try {
    await conection.executeWithParameters(sql, parameters);
    return "success";
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function getlastVacationId() {
  let sql = "SELECT * FROM vacations ORDER BY vacationId DESC LIMIT 1";
  try {
    let response = await conection.execute(sql);
    return response;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

module.exports = {
  allVacations,
  deleteVacation,
  addNewVacation,
  changeOldVacation,
  getlastVacationId,
  getImgForDelete,
};
