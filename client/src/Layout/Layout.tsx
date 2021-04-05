import React, { Component } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import "./Layout.css";
import { BrowserRouter } from "react-router-dom";
import ChangingVacation from "../Main/MainVacation/ChangingVacation/ChangingVacation";
import { Unsubscribe } from "redux";
import { store } from "../Redux/Store";

export default class Layout extends Component {
  private unsubscribe: Unsubscribe;

  public componentDidMount = () => {
    this.unsubscribe = store.subscribe(() => this.setState({}));
  };

  public componentWillUnmount = () => {
    this.unsubscribe();
  };

  public render() {
    return (
      <BrowserRouter>
        <section className="Layout">
          <div>
            <Header />
            <Main />
            {store.getState().showAddVacation && <ChangingVacation />}
          </div>
        </section>
      </BrowserRouter>
    );
  }
}
