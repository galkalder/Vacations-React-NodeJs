import { Vacation } from "./../Model/Vacation";

export class AppState {
  userNameLogin: string = "";
  userPasswordLogin: string = "";
  userNameRegister: string = "";
  userFirstNameRegister: string = "";
  userLastNameRegister: string = "";
  userPasswordRegister: string = "";
  Vacations: Vacation[] = [];
  showAddVacation: boolean = false;
  addVacationDescription: string = "";
  addVacationPhoto: any;
  addVacationPrice: string = "";
  addVacationStartDate: string = "";
  addVacationEndDate: string = "";
  editMode: boolean = false;
  changeVacationId: number = -1;
  Login: string = "";
  isAuth: boolean = false;
  isAdmin: boolean = false;
  isInit: boolean = false;
}
