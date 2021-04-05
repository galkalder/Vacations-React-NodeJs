import Axios from "axios";
import React, { ChangeEvent, Component } from "react";
import { Unsubscribe } from "redux";
import { ActionType } from "../../Redux/ActionType";
import { store } from "../../Redux/Store";
import { isInputValid } from "../MainVacation/VacationValidation/VacationValidation";
import "./Registration.css";

export class Registration extends Component<any, any> {
  private unsubscribe: Unsubscribe;

  constructor(props: any) {
    super(props);
    this.unsubscribe = store.subscribe(() => this.setState({}));
  }

  private setUserNameRegister = (event: ChangeEvent<HTMLInputElement>) => {
    store.dispatch({
      type: ActionType.setUserNameRegister,
      payload: event.target.value,
    });
  };

  private setUserFirstNameRegister = (event: ChangeEvent<HTMLInputElement>) => {
    store.dispatch({
      type: ActionType.setUserFirstNameRegister,
      payload: event.target.value,
    });
  };

  private setUserLastNameRegister = (event: ChangeEvent<HTMLInputElement>) => {
    store.dispatch({
      type: ActionType.setUserLastNameRegister,
      payload: event.target.value,
    });
  };

  private setPasswordRegister = (event: ChangeEvent<HTMLInputElement>) => {
    store.dispatch({
      type: ActionType.setPasswordRegister,
      payload: event.target.value,
    });
  };

  private registration = async () => {
    let isUserNameValid = isInputValid(store.getState().userNameRegister);
    let isFirstNameValid = isInputValid(store.getState().userFirstNameRegister);
    let isLastNameValid = isInputValid(store.getState().userLastNameRegister);
    let isPasswordValid = isInputValid(store.getState().userPasswordRegister);
    if (
      !isUserNameValid ||
      !isFirstNameValid ||
      !isLastNameValid ||
      !isPasswordValid
    ) {
      let message = "you must fill all fields correctly";
      alert(message);
      return;
    }
    try {
      await Axios.post("http://localhost:3001/users/register", {
        userName: store.getState().userNameRegister,
        firstName: store.getState().userFirstNameRegister,
        lastName: store.getState().userLastNameRegister,
        password: store.getState().userPasswordRegister,
      });
      alert("successfull registration");
      this.props.history.push("/login");
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  render() {
    return (
      <div className="mainDivReg">
        <div className="secondMainDivReg">
          <div className="RegTitle2">
            <h2>Registration</h2>
          </div>
          <div>
            <input
              className="inputRegUserName"
              type="text"
              placeholder="Enter User Name"
              value={store.getState().userNameRegister}
              onChange={this.setUserNameRegister}
            />
          </div>
          <div>
            <input
              className="inputRegFirstName"
              type="text"
              placeholder="Enter First Name"
              value={store.getState().userFirstNameRegister}
              onChange={this.setUserFirstNameRegister}
            />
          </div>
          <div>
            <input
              className="inputRegLastName"
              type="text"
              placeholder="Enter User Last Name"
              value={store.getState().userLastNameRegister}
              onChange={this.setUserLastNameRegister}
            />
          </div>
          <div>
            <input
              className="inputRegPassword"
              type="password"
              placeholder="Enter Password"
              value={store.getState().userPasswordRegister}
              onChange={this.setPasswordRegister}
            />
          </div>
          <div className="RegbuttonRegister">
            <button onClick={this.registration}>Register</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;
