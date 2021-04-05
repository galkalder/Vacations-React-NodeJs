import Axios from "axios";
import React, { Component } from "react";
import { Unsubscribe } from "redux";
import { ActionType } from "../Redux/ActionType";
import { store } from "../Redux/Store";
import "./Header.css";
import MeetingRoomRoundedIcon from "@material-ui/icons/MeetingRoomRounded";

interface headerState {
  Login: string;
  isAuth: boolean;
}

export default class Header extends Component<any, headerState> {
  private unsubscribe: Unsubscribe;

  constructor(props: any) {
    super(props);

    this.state = {
      Login: store.getState().Login,
      isAuth: store.getState().isAuth,
    };
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  //press F5 keeps it on the same component
  async componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState({
        Login: store.getState().Login,
        isAuth: store.getState().isAuth,
      })
    );
  }

  private logOutFunction = async () => {
    try {
      await Axios.post("http://localhost:3001/users/logout", {
        token: sessionStorage.getItem("token"),
      });
      sessionStorage.removeItem("token");
      store.dispatch({
        type: ActionType.logout,
      });
    } catch (error) {
      alert(error.response.data.error);
      store.dispatch({ type: ActionType.logout });
    }
  };

  public render() {
    return (
      <div className="Header">
        <div className="TitileDiv">
          <h1 className="Title1">Choose Your Vacation</h1>
        </div>
        {this.state.isAuth ? (
          <div className="userNameLogIn">{this.state.Login}</div>
        ) : (
          <div className="userNameLogIn"></div>
        )}
        {store.getState().isAuth && (
          <div className="LoginDiv">
            <MeetingRoomRoundedIcon
              className="buttonLogout"
              onClick={this.logOutFunction}
            />
          </div>
        )}
      </div>
    );
  }
}
