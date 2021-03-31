import {
    FETCH_BEGIN,
    FETCH_SUCCESS,
    FETCH_FAILURE,
    GET_TOTALPAGES
  } from "./ResultActions";
  
  const initialState = {
    items: [],
    totalpages: 1,
    loading: false,
    error: null
  };
  
  export default function resultReducer(
    state = initialState,
    action
  ) {
    switch (action.type) {
      case FETCH_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_SUCCESS:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        return {
          ...state,
          loading: false,
          items: action.payload.results,
        };

      case GET_TOTALPAGES:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        return {
          ...state,
          totalpages: action.payload.pages
        };
  
      case FETCH_FAILURE:
        // The request failed, but it did stop, so set loading to "false".
        // Save the error, and we can display it somewhere
        // Since it failed, we don't have items to display anymore, so set it empty.
        // This is up to you and your app though: maybe you want to keep the items
        // around! Do whatever seems right.
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          items: []
        };
  
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }
  