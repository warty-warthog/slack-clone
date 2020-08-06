import * as actionTypes from "../actions/types";
// combineReducers determines what property on global state are given reducer updates
// For example, it makes sure that the user_reducer only modifies the state of users
import { combineReducers } from "redux";

const initialUserState = {
  currentUser: null,
  isLoading: true,
};

// User reducer
const user_reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        // action.payload.currentUser refers to the current data or payload on the current user
        currentUser: action.payload.currentUser,
        isLoading: false,
      };

    case actionTypes.CLEAR_USER:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

// Channel reducer
const initialChannelState = {
  currentChannel: null,
};

const channel_reducer = (state = initialChannelState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel,
      };

    default:
      return state;
  }
};

// Root Reducer
const rootReducer = combineReducers({
  // In this case when state has been updated by the user_reducer, its state values are put on the user property
  user: user_reducer,
  channel: channel_reducer,
});

export default rootReducer;
