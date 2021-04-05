const express = require("express");
const router = express.Router();
const followLogic = require("../logic/followLogic");

router.post("/", async (request, response, next) => {
  try {
    let followResponse = await followLogic.onClickFollow(request.query.vacationId, request.body.token);
    response.send(followResponse);
  } catch (error) {
    return next(error);
  }
    
  });

  router.delete("/", async (request, response, next) => {
    try {
      let followResponse = await followLogic.onClickUnFollow(request.query.vacationId, request.headers.token);
      response.send(followResponse);
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;