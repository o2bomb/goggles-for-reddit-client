import { SHOW_TOAST, HIDE_TOAST } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case SHOW_TOAST:
      return state ? [...state, action.toast] : [action.toast];
    case HIDE_TOAST:
      return state.filter(toast => toast.timestamp !== action.toast.timestamp);
    default:
      return state;
  }
}
