import { FETCH_GENRE_DATA } from "../actions/actionType";

const initialState = {
  genres: [],
};

function genreReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_GENRE_DATA:
      return {
        ...state,
        genres: action.payload,
      };
    default:
      return state;
  }
}

export default genreReducer;
