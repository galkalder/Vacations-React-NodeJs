const express = require("express");
const cors = require("cors");
const http = require("http");
const socket = require("socket.io");
const loginFilter = require("./login-filter");
const server = express();

const httpServer = http.createServer(server);
const io = socket(httpServer);

const usersController = require("./controllers/usersController");
const vacationController = require("./controllers/vacationController");
const followController = require("./controllers/followController");
const errorHandler = require("./errors/error-handler");
const ServerError = require("./errors/server-error");
const ErrorType = require("./errors/error-type");

server.use(cors({ origin: "http://localhost:4200", credentials: true }));

//file upload
server.use(express.static("./uploads"));

server.use(express.json());
server.use(loginFilter());
server.use(function (err, req, res, next) {
  if (401 == err.status) {
    throw new ServerError(ErrorType.SOCKET_ERROR);
  }
});

const PORT = process.env.PORT || 3001;

server.use("/users", usersController);
server.use("/vacation", vacationController);
server.use("/follow", followController);
server.use(errorHandler);
httpServer.listen(PORT, () => {
  console.log(`server is listening on Port ${PORT}`);
});

// socket server
io.on("connection", function (socket) {
  console.log("A user connected");

  socket.on("addVacation", (vacation) => {
    io.emit("addVacation", vacation);
  });

  socket.on("deleteVacation", (vacationId) => {
    io.emit("deleteVacation", vacationId);
  });

  socket.on("editVacation", (vacation) => {
    io.emit("editVacation", vacation);
  });

  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});
