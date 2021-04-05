import Axios from "axios";
import React, { ChangeEvent, Component } from "react";
import { NavLink } from "react-router-dom";
import { ActionType } from "../../Redux/ActionType";
import { store } from "../../Redux/Store";
import { isInputValid } from "../MainVacation/VacationValidation/VacationValidation";
import "./Login.css";

export class Login extends Component {
  private setUserNameLogin = (event: ChangeEvent<HTMLInputElement>) => {
    store.dispatch({
      type: ActionType.setUserNameLogin,
      payload: event.target.value,
    });
  };

  private setPasswordLogin = (event: ChangeEvent<HTMLInputElement>) => {
    store.dispatch({
      type: ActionType.setPasswordLogin,
      payload: event.target.value,
    });
  };

  private login = async () => {
    let userNameValidation = isInputValid(store.getState().userNameLogin);
    let userPasswordValidation = isInputValid(
      store.getState().userPasswordLogin
    );
    if (!userNameValidation || !userPasswordValidation) {
      let message = "you must fill all fields correctly";
      alert(message);
      return;
    } else {
      try {
        let response = await Axios.post("http://localhost:3001/users/login", {
          userName: store.getState().userNameLogin,
          password: store.getState().userPasswordLogin,
        });
        let serverResponse = response.data;
        sessionStorage.setItem("token", serverResponse.token);
        Axios.defaults.headers.common["Authorization"] =
          "Bearer " + serverResponse.token;

        let user = {
          userName: response.data.userName,
          userType: response.data.userType,
        };
        store.dispatch({
          type: ActionType.login,
          payload: user,
        });
      } catch (error) {
        alert(error.response.data.error);
      }
    }
  };

  render() {
    return (
      <div className="mainDivLogin">
        <div className="secondMainDivLogin">
          <div className="Title2">
            <h2>Login</h2>
          </div>
          <div>
            <input
              className="inputUserName"
              type="text"
              placeholder="Enter User Name"
              value={store.getState().userNameLogin}
              onChange={this.setUserNameLogin}
            />
          </div>
          <div>
            <input
              className="inputPassword"
              type="password"
              placeholder="Enter Password"
              value={store.getState().userPasswordLogin}
              onChange={this.setPasswordLogin}
            />
          </div>
          <div className="buttonLogin2">
            <button onClick={this.login}>Login</button>
          </div>
          <div className="buttonRegister">
            <NavLink to="/Registration">Registration</NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
