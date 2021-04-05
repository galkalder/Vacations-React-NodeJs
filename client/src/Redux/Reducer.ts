import { Vacation } from "./../Model/Vacation";
import { AppState } from "./AppState";
import { ActionType } from "./ActionType";
import { Action } from "./Action";

export function reduce(oldAppState: AppState, action: Action): AppState {
  const newAppState = { ...oldAppState };

  switch (action.type) {
    case ActionType.setUserNameLogin:
      newAppState.userNameLogin = action.payload;
      break;
    case ActionType.setPasswordLogin:
      newAppState.userPasswordLogin = action.payload;
      break;
    case ActionType.setUserNameRegister:
      newAppState.userNameRegister = action.payload;
      break;
    case ActionType.setUserFirstNameRegister:
      newAppState.userFirstNameRegister = action.payload;
      break;
    case ActionType.setUserLastNameRegister:
      newAppState.userLastNameRegister = action.payload;
      break;
    case ActionType.setPasswordRegister:
      newAppState.userPasswordRegister = action.payload;
      break;
    case ActionType.deleteVacation:
      newAppState.Vacations = oldAppState.Vacations.filter((vacation) => {
        return vacation.vacationId !== action.payload;
      });
      break;
    case ActionType.setAddVacationDescription:
      newAppState.addVacationDescription = action.payload;
      break;
    case ActionType.setAddVacationPrice:
      newAppState.addVacationPrice = action.payload;
      break;
    case ActionType.setAddVacationStartDate:
      newAppState.addVacationStartDate = action.payload;
      break;
    case ActionType.setAddVacationEndDate:
      newAppState.addVacationEndDate = action.payload;
      break;
    case ActionType.addNewVacation:
      let NewVacation = new Vacation(
        10,
        oldAppState.addVacationDescription,
        oldAppState.addVacationPrice,
        action.payload,
        oldAppState.addVacationStartDate,
        oldAppState.addVacationEndDate,
        false,
        0
      );

      newAppState.Vacations = [...oldAppState.Vacations, NewVacation];
      newAppState.addVacationDescription = "";
      newAppState.addVacationPrice = "";
      newAppState.addVacationStartDate = "";
      newAppState.addVacationEndDate = "";
      newAppState.showAddVacation = false;
      break;
    case ActionType.addNewVacationSocket:
      let NewVacationSocket = new Vacation(
        action.payload.vacationId,
        action.payload.description,
        action.payload.price,
        action.payload.imgUrl,
        action.payload.startDate,
        action.payload.endDate,
        false,
        0
      );

      newAppState.Vacations = [...oldAppState.Vacations, NewVacationSocket];
      break;
    case ActionType.changeOldVacation:
      let NewVacation2 = new Vacation(
        oldAppState.changeVacationId,
        oldAppState.addVacationDescription,
        oldAppState.addVacationPrice,
        action.payload,
        oldAppState.addVacationStartDate,
        oldAppState.addVacationEndDate,
        false,
        0
      );

      newAppState.Vacations = oldAppState.Vacations.map((vacationItem) => {
        if (vacationItem.vacationId === oldAppState.changeVacationId) {
          return NewVacation2;
        }
        return vacationItem;
      });
      newAppState.addVacationDescription = "";
      newAppState.addVacationPrice = "";
      newAppState.addVacationStartDate = "";
      newAppState.addVacationEndDate = "";
      newAppState.showAddVacation = false;
      break;
    case ActionType.changeOldVacationSocket:
      let NewVacation2Socket = new Vacation(
        action.payload.vacationId,
        action.payload.description,
        action.payload.price,
        action.payload.imgUrl,
        action.payload.startDate,
        action.payload.endDate,
        action.payload.follow,
        0
      );

      newAppState.Vacations = oldAppState.Vacations.map((vacationItem) => {
        if (vacationItem.vacationId === action.payload.vacationId) {
          return NewVacation2Socket;
        }
        return vacationItem;
      });
      break;
    case ActionType.showVacationEdit:
      newAppState.showAddVacation = true;
      newAppState.editMode = true;
      newAppState.changeVacationId = action.payload.vacationId;
      newAppState.addVacationDescription = action.payload.description;
      newAppState.addVacationPrice = action.payload.price;
      newAppState.addVacationStartDate = action.payload.startDate;
      newAppState.addVacationEndDate = action.payload.endDate;
      break;
    case ActionType.showVacationAdd:
      newAppState.showAddVacation = true;
      newAppState.editMode = false;
      break;
    case ActionType.hideVacationEdit:
      newAppState.showAddVacation = false;
      newAppState.addVacationDescription = "";
      newAppState.addVacationPrice = "";
      newAppState.addVacationStartDate = "";
      newAppState.addVacationEndDate = "";
      break;
    case ActionType.login:
      newAppState.isAuth = true;
      newAppState.Login = action.payload.userName;
      if (action.payload.userType === "admin") {
        newAppState.isAdmin = true;
      } else newAppState.isAdmin = false;
      break;
    case ActionType.logout:
      newAppState.isAuth = false;
      newAppState.Login = "";
      sessionStorage.clear();
      break;
    case ActionType.setAllVacations:
      newAppState.Vacations = action.payload;
      break;
    case ActionType.onClickFollow:
      newAppState.Vacations = oldAppState.Vacations.map((vacation) => {
        if (vacation.vacationId === action.payload) {
          vacation.follow = true;
        }
        return vacation;
      });
      break;
    case ActionType.onClickUnFollow:
      newAppState.Vacations = oldAppState.Vacations.map((vacation) => {
        if (vacation.vacationId === action.payload) {
          vacation.follow = false;
        }
        return vacation;
      });
      break;
    case ActionType.setVacationPhoto:
      newAppState.addVacationPhoto = action.payload;
      break;
    case ActionType.init:
      newAppState.isInit = true;
      break;
  }
  return newAppState;
}
