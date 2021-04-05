import { ActionType } from "./../Redux/ActionType";
import { store } from "./../Redux/Store";
import io from "socket.io-client";
import { Vacation } from "../Model/Vacation";

let socket: any;

export const addSocketEvents = () => {
  socket = io("http://localhost:3001/");

  socket.on("addVacation", (vacation: Vacation) => {
    store.dispatch({
      type: ActionType.addNewVacationSocket,
      payload: vacation,
    });
  });

  socket.on("editVacation", (vacation: Vacation) => {
    store.dispatch({
      type: ActionType.changeOldVacationSocket,
      payload: vacation,
    });
  });

  socket.on("deleteVacation", (vacationId: number) => {
    store.dispatch({
      type: ActionType.deleteVacation,
      payload: vacationId,
    });
  });
};

export const socketRequests = {
  deleteVacation: (vacationId: number) => {
    socket.emit("deleteVacation", vacationId);
  },

  addVacation: (vacation: Vacation) => {
    socket.emit("addVacation", vacation);
  },

  editVacation: (vacation: Vacation) => {
    socket.emit("editVacation", vacation);
  },

  endSocket() {
    if (socket != null) {
      socket.disconnect();
    }
  },
};
