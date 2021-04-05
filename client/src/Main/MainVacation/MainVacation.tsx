import Axios from "axios";
import React, { Component } from "react";
import { ActionType } from "../../Redux/ActionType";
import { store } from "../../Redux/Store";
import "./MainVacation.css";
import { VacationItem } from "./Vacation/Vacation";
import { addSocketEvents, socketRequests } from "../../Socketio/socketio";
import { NavLink } from "react-router-dom";
import InsertChartRoundedIcon from "@material-ui/icons/InsertChartRounded";
import { isAxiosValid } from "./VacationValidation/VacationValidation";

export class MainVacation extends Component {
  componentWillUnmount() {
    socketRequests.endSocket();
  }

  private showAddVacation = () => {
    store.dispatch({
      type: ActionType.showVacationAdd,
    });
  };

  // get all vacations
  async componentDidMount() {
    try {
      let response = await Axios.get("http://localhost:3001/vacation", {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      //
      for (let vacation of response.data) {
        vacation.imgUrl = "http://localhost:3001/" + vacation.imgUrl;
      }
      //
      store.dispatch({
        type: ActionType.setAllVacations,
        payload: response.data,
      });
      addSocketEvents();
    } catch (error) {
      if (!isAxiosValid(error)) {
        alert(error.message);
        store.dispatch({
          type: ActionType.logout,
        });
        return;
      }
      alert(error.response.data.error);
      if (error.response.status === 838 || error.response.status === 500) {
        store.dispatch({
          type: ActionType.logout,
        });
      }
    }
  }

  render() {
    return (
      <div className="MainVacation">
        {store.getState().isAdmin && (
          <div className="addVacationDiv">
            <button
              onClick={this.showAddVacation}
              className="addVacationButton"
            >
              Add Vacation
            </button>
            <NavLink to="/Graph" exact className="graphLink">
              <InsertChartRoundedIcon className="graphpic" />
            </NavLink>
          </div>
        )}
        {store.getState().Vacations.map((vacation, index) => (
          <VacationItem vacation={vacation} key={index} />
        ))}
      </div>
    );
  }
}

export default MainVacation;
