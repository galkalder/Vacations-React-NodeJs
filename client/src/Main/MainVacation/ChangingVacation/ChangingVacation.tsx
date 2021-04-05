import React, { ChangeEvent, Component } from "react";
import { ActionType } from "../../../Redux/ActionType";
import { store } from "../../../Redux/Store";
import "./ChangingVacation.css";
import Axios from "axios";
import { socketRequests } from "../../../Socketio/socketio";
import { successAxiosVacationId } from "../../../Model/Vacation";
import {
  isAxiosValid,
  isDateValid,
  isVacationInputValid,
} from "../VacationValidation/VacationValidation";

export class ChangingVacation extends Component<any> {
  private setAddVacationDescription = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    store.dispatch({
      type: ActionType.setAddVacationDescription,
      payload: event.target.value,
    });
  };

  private setAddVacationPrice = (event: ChangeEvent<HTMLInputElement>) => {
    store.dispatch({
      type: ActionType.setAddVacationPrice,
      payload: event.target.value,
    });
  };

  private setAddVacationStartDate = (event: ChangeEvent<HTMLInputElement>) => {
    store.dispatch({
      type: ActionType.setAddVacationStartDate,
      payload: event.target.value,
    });
  };

  private setAddVacationEndDate = (event: ChangeEvent<HTMLInputElement>) => {
    store.dispatch({
      type: ActionType.setAddVacationEndDate,
      payload: event.target.value,
    });
  };

  private addNewVacation = async () => {
    let isInputFieldValid = isVacationInputValid(
      store.getState().addVacationDescription,
      store.getState().addVacationPrice,
      store.getState().addVacationPhoto
    );

    if (!isInputFieldValid) {
      let message = "all fields must be filled";
      alert(message);
      return;
    }

    let isDateFieldValid = isDateValid(
      store.getState().addVacationStartDate,
      store.getState().addVacationEndDate
    );
    if (!isDateFieldValid) {
      let message = "dates must be filled correctly";
      alert(message);
      return;
    }
    const data = new FormData();
    data.append("file", store.getState().addVacationPhoto);
    Axios.defaults.headers.common["Authorization"] =
      "Bearer " + sessionStorage.getItem("token");
    try {
      let res = await Axios.post(
        "http://localhost:3001/vacation/upload",
        data,
        {}
      );
      const vacation = {
        vacationId: -1,
        description: store.getState().addVacationDescription,
        price: store.getState().addVacationPrice,
        imgUrl: res.data,
        startDate: store.getState().addVacationStartDate,
        endDate: store.getState().addVacationEndDate,
        follow: false,
        followers: 0,
      };
      const response = await Axios.post<successAxiosVacationId>(
        "http://localhost:3001/vacation",
        vacation
      );
      vacation.vacationId = response.data.vacationId;
      store.dispatch({
        type: ActionType.hideVacationEdit,
      });
      socketRequests.addVacation(vacation);
    } catch (error) {
      if (!isAxiosValid(error)) {
        alert(error.message);
        store.dispatch({
          type: ActionType.logout,
        });
        return;
      }
      alert(JSON.stringify(error));
    }
  };

  private changeOldVacation = async () => {
    let isInputFieldValid = isVacationInputValid(
      store.getState().addVacationDescription,
      store.getState().addVacationPrice,
      store.getState().addVacationPhoto
    );

    if (!isInputFieldValid) {
      let message = "all fields must be filled";
      alert(message);
      return;
    }

    let isDateFieldValid = isDateValid(
      store.getState().addVacationStartDate,
      store.getState().addVacationEndDate
    );
    if (!isDateFieldValid) {
      let message = "dates must be filled correctly";
      alert(message);
      return;
    }
    const data = new FormData();
    data.append("file", store.getState().addVacationPhoto);
    Axios.defaults.headers.common["Authorization"] =
      "Bearer " + sessionStorage.getItem("token");
    try {
      let res = await Axios.post(
        "http://localhost:3001/vacation/upload",
        data,
        {}
      );
      if (res.data === "must add a photo") {
        alert("you must add a photo");
        return;
      }
      const vacation = {
        vacationId: store.getState().changeVacationId,
        description: store.getState().addVacationDescription,
        price: store.getState().addVacationPrice,
        imgUrl: res.data,
        startDate: store.getState().addVacationStartDate,
        endDate: store.getState().addVacationEndDate,
        follow: false,
        followers: 0,
      };
      await Axios.put("http://localhost:3001/vacation", vacation);
      store.dispatch({
        type: ActionType.hideVacationEdit,
      });
      socketRequests.editVacation(vacation);
    } catch (error) {
      if (!isAxiosValid(error)) {
        alert(error.message);
        store.dispatch({
          type: ActionType.logout,
        });
        return;
      }
      if (error.response === undefined) {
        alert(error.message);
        return;
      }
      alert(error.response.data.error);
    }
  };

  private hideVacationEdit = () => {
    store.dispatch({
      type: ActionType.hideVacationEdit,
    });
  };

  private setVacationPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const Photo = event.target.files[0];

    store.dispatch({
      type: ActionType.setVacationPhoto,
      payload: Photo,
    });
  };

  render() {
    return (
      <div className="mainDivAddVacation">
        <div className="addVacationDivTitle">
          {store.getState().editMode ? (
            <h2 className="addVacaionTitle">Edit Vacation</h2>
          ) : (
            <h2 className="addVacaionTitle">Add Vacation</h2>
          )}
        </div>
        <div className="addVacationDivDescription">
          <textarea
            className="inputAddDescription"
            placeholder="Enter Description"
            value={store.getState().addVacationDescription}
            onChange={this.setAddVacationDescription}
          />
        </div>
        <div className="addVacationDivPrice">
          <div className="priceDiv">Price</div>
          <input
            className="inputAddPrice"
            type="text"
            placeholder="Enter Price"
            value={store.getState().addVacationPrice}
            onChange={this.setAddVacationPrice}
          />
        </div>
        <div className="addVacationDivStartDate">
          <div className="StartDateDiv">Start Date</div>
          <input
            className="inputAddStartDate"
            type="date"
            placeholder="Enter Start Date"
            value={store.getState().addVacationStartDate}
            onChange={this.setAddVacationStartDate}
          />
        </div>
        <div className="addVacationDivEndDate">
          <div className="EndDateDiv">End Date</div>
          <input
            className="inputAddStartDate"
            type="date"
            placeholder="Enter Start Date"
            value={store.getState().addVacationEndDate}
            onChange={this.setAddVacationEndDate}
          />
        </div>
        <div className="buttonsDiv">
          <div className="VacationDivAddPhoto">
            <input type="file" onChange={this.setVacationPhoto} />
          </div>
          <div className="addVacationDivCloseButton">
            <button onClick={this.hideVacationEdit}>Close</button>
          </div>
          <div className="addVacationDivSaveButton">
            <button
              onClick={
                store.getState().editMode
                  ? this.changeOldVacation
                  : this.addNewVacation
              }
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangingVacation;
