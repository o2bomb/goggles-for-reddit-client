import axios from "axios";
import {
  FETCH_USER,
  SHOW_TOAST,
  HIDE_TOAST,
  FETCH_SUBREDDIT
} from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/user");
  console.log(`LOGIN: ${res.data}`);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSubreddit = (subredditId = null, type = "", time = "") => async (dispatch, getState) => {
  const after = getState().home.after || "";
  const url = `/api/subreddits/${subredditId ? `${subredditId}/posts` : "frontpage"}?after=${after}&type=${type}&time=${time}`;
  const res = await axios.get(url);
  res.data.subreddit = subredditId ? subredditId.toLowerCase() : null;
  res.data.type = type;
  res.data.time = time;

  dispatch({ type: FETCH_SUBREDDIT, payload: res.data });
}

export const showToast = (message, timeout = 3500) => (dispatch) => {
  const toast = {
    timestamp: Date.now(),
    message,
  };

  dispatch({
    type: SHOW_TOAST,
    toast,
  });

  setTimeout(() => {
    hideToast(toast)(dispatch);
  }, timeout);
};

export const hideToast = (toast) => (dispatch) => {
  dispatch({
    type: HIDE_TOAST,
    toast,
  });
};
