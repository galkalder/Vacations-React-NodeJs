const followDao = require("../dao/followDao");
const usersCache = require("../models/usersCache");

async function onClickFollow(vacationId, token) {
    const user = usersCache.get(token)
    let vacationResponse = await followDao.onClickFollow(vacationId, user.userId);
    return vacationResponse;
  }

  async function onClickUnFollow(vacationId, token) {
    const user = usersCache.get(token)
    let vacationResponse = await followDao.onClickUnFollow(vacationId, user.userId);
    return vacationResponse;
  }

module.exports = {onClickFollow, onClickUnFollow};