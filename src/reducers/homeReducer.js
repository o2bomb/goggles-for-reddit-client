import { FETCH_SUBREDDIT } from "../actions/types";

export default function(state = { subreddit: null, type: "", time: "", before: null, after: null, posts: [] }, action) {
  switch (action.type) {
    case FETCH_SUBREDDIT:
      let fetchNewPosts = false;
      if(action.payload.subreddit !== state.subreddit || action.payload.type !== state.type || action.payload.time !== state.time ) {
        fetchNewPosts = true;
      }

      return {
        ...state,
        subreddit: action.payload.subreddit,
        type: action.payload.type,
        time: action.payload.time,
        before: action.payload.before,
        after: action.payload.after,
        posts: fetchNewPosts ? action.payload.posts : state.posts.concat(action.payload.posts)
      };
    default:
      return state;
  }
}
