const ErrorType = {
  GENERAL_ERROR: {
    id: 1,
    httpCode: 600,
    message:
      "A big fuck up which we'll never tell you of had just happened. And now : A big fat lie....'A general error ....'",
    isShowStackTrace: true,
  },
  USER_NAME_ALREADY_EXIST: {
    id: 2,
    httpCode: 601,
    message: "User name already exist",
    isShowStackTrace: false,
  },
  UNAUTHORIZED: {
    id: 3,
    httpCode: 401,
    message: "Invalid user name or password",
    isShowStackTrace: false,
  },
  SOCKET_ERROR: {
    id: 4,
    httpCode: 838,
    message: "Invalid token",
    isShowStackTrace: false,
  },
  FILE_MISSING_ERROR: {
    id: 5,
    httpCode: 432,
    message: "you must add a picture",
    isShowStackTrace: false,
  },
  NO_VACATIONS_DATA: {
    id: 5,
    httpCode: 500,
    message: "we are sorry the problem will be solved soon",
    isShowStackTrace: true,
  },
};

module.exports = ErrorType;
