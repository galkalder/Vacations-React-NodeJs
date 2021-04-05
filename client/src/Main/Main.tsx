import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import MainVacation from "./MainVacation/MainVacation";
import Login from "./Login/Login";
import Registration from "./Registration/Registration";
import { store } from "../Redux/Store";
import followGraph from "../Main/Graph/followGraph";
import { Unsubscribe } from "redux";
import { ActionType } from "../Redux/ActionType";
import Axios from "axios";

export default class Main extends Component {
  private unsubscribe: Unsubscribe;

  // auto login
  public componentDidMount = async () => {
    this.unsubscribe = store.subscribe(() => this.setState({}));
    try {
      if (sessionStorage.getItem("token") != null) {
        Axios.defaults.headers.common["Authorization"] =
          "Bearer " + sessionStorage.getItem("token");

        let response = await Axios.post(
          "http://localhost:3001/users/autologin",
          {
            token: sessionStorage.getItem("token"),
          }
        );
        store.dispatch({
          type: ActionType.login,
          payload: response.data,
        });
      }
    } catch (error) {
      alert(error.response.data.error);
      store.dispatch({ type: ActionType.logout });
    }
    store.dispatch({ type: ActionType.init });
  };

  public componentWillUnmount = () => {
    this.unsubscribe();
  };

  public render() {
    return (
      <div className="Main">
        {store.getState().isInit ? (
          store.getState().isAuth ? (
            <Switch>
              <Redirect from="/" to="/MainVacation" exact />
              <Redirect from="/Registration" to="/MainVacation" exact />
              <Redirect from="/Login" to="/MainVacation" exact />
              <Route path="/MainVacation" component={MainVacation} />
              <Route path="/Graph" component={followGraph} />
            </Switch>
          ) : (
            <Switch>
              <Redirect from="/MainVacation" to="/Login" exact />
              <Redirect from="/" to="/Login" exact />
              <Redirect from="/Graph" to="/Login" exact />
              <Route path="/Login" component={Login} />
              <Route path="/" component={Registration} />
            </Switch>
          )
        ) : null}
      </div>
    );
  }
}
