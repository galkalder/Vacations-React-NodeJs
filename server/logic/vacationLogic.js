const vacationDao = require("../dao/vacationDao");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
const usersCache = require("../models/usersCache");

async function allVacations(token) {
  const user = usersCache.get(token);
  if (!user) {
    throw new ServerError(ErrorType.SOCKET_ERROR);
  }
  let vacationResponse = await vacationDao.allVacations(user.userId);
  return vacationResponse;
}

async function addNewVacation(vacation) {
  vacation.imgUrl = vacation.imgUrl.slice(
    "http://localhost:3001/".length,
    vacation.imgUrl.length
  );
  await vacationDao.addNewVacation(vacation);
  let vacationResponse = await vacationDao.getlastVacationId();
  return vacationResponse[0];
}

async function changeOldVacation(vacation) {
  vacation.imgUrl = vacation.imgUrl.slice(
    "http://localhost:3001/".length,
    vacation.imgUrl.length
  );
  vacationDao.changeOldVacation(vacation);
}

async function deleteVacation(vacationId) {
  let imgForDelete = await vacationDao.getImgForDelete(vacationId);
  vacationDao.deleteVacation(vacationId);
  return imgForDelete;
}

module.exports = {
  allVacations,
  addNewVacation,
  deleteVacation,
  changeOldVacation,
};
