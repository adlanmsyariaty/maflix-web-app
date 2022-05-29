import { FETCH_CAST_DATA } from "../actions/actionType";

const initialState = {
  casts: [],
};

function castReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CAST_DATA:
      return {
        ...state,
        casts: action.payload,
      };
    default:
      return state;
  }
}

export default castReducer;
