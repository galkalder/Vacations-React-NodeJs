import Axios from "axios";
import React, { Component } from "react";
import { Unsubscribe } from "redux";
import editButton from "../../../images/editButton.png";
import XButton from "../../../images/XButton.png";
import { Vacation } from "../../../Model/Vacation";
import { ActionType } from "../../../Redux/ActionType";
import { store } from "../../../Redux/Store";
import { socketRequests } from "../../../Socketio/socketio";
import "./Vacation.css";

interface vacationProps {
  vacation: Vacation;
}

export class VacationItem extends Component<vacationProps> {
  private unsubscribe: Unsubscribe;

  componentWillUnmount() {
    this.unsubscribe();
  }

  async componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState({}));
  }

  private onClickFollow = async () => {
    try {
      await Axios.post(
        `http://localhost:3001/follow?vacationId=${this.props.vacation.vacationId}`,
        {
          token: sessionStorage.getItem("token"),
        }
      );

      store.dispatch({
        type: ActionType.onClickFollow,
        payload: this.props.vacation.vacationId,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  private onClickUnFollow = async () => {
    try {
      await Axios.delete(
        `http://localhost:3001/follow?vacationId=${this.props.vacation.vacationId}`,
        {
          headers: { token: sessionStorage.getItem("token") },
        }
      );
      store.dispatch({
        type: ActionType.onClickUnFollow,
        payload: this.props.vacation.vacationId,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  private deleteVacation = async () => {
    try {
      alert("delete vacation with id " + this.props.vacation.vacationId);
      await Axios.delete(
        `http://localhost:3001/vacation?vacationId=${this.props.vacation.vacationId}`,
        {}
      );
      store.dispatch({
        type: ActionType.deleteVacation,
        payload: this.props.vacation.vacationId,
      });
      socketRequests.deleteVacation(this.props.vacation.vacationId);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  private showEditVacation = () => {
    store.dispatch({
      type: ActionType.showVacationEdit,
      payload: this.props.vacation,
    });
  };

  render() {
    return (
      <div className="vacationDiv">
        {store.getState().isAdmin ? (
          <div className="editAndXDiv">
            <div className="VacationEditDiv" onClick={this.showEditVacation}>
              <img
                src={editButton}
                className="editButtonImg"
                alt="edit button"
              />
            </div>
            <div className="VacationXDiv">
              <img
                alt="X button"
                src={XButton}
                className="XButtonImg"
                onClick={this.deleteVacation}
              />
            </div>
          </div>
        ) : (
          <div className="vacationDivButtonFollow">
            {this.props.vacation.follow ? (
              <button
                className="vacationButtonFollow"
                onClick={this.onClickUnFollow}
              >
                unfollow
              </button>
            ) : (
              <button
                className="vacationButtonFollow"
                onClick={this.onClickFollow}
              >
                follow
              </button>
            )}
          </div>
        )}
        <div className="vacationDivDescription">
          {this.props.vacation.description}
        </div>
        <div className="vactionDivPrice">{this.props.vacation.price}$</div>
        <div className="divVacationImg">
          <img
            src={this.props.vacation.imgUrl}
            className="vactionImg"
            alt={this.props.vacation.description}
          />
        </div>
        <div className="vacationDivDates">
          {this.props.vacation.startDate} to {this.props.vacation.endDate}
        </div>
      </div>
    );
  }
}

export default Vacation;
