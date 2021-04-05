import { createStore } from "redux";
import { reduce } from "./Reducer";
import { AppState } from "./AppState";

export const store = createStore(reduce, new AppState());

declare global {
  interface Window {
    store: any;
  }
}
window.store = store;
