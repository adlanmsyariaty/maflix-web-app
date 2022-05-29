import {
  FETCH_MOVIE_DATA,
  FETCH_MOVIE_DETAIL
} from "../actions/actionType";

const initialState = {
  movies: [],
  movie: {}
};

function movieReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIE_DATA:
      return {
        ...state,
        movies: action.payload,
      };
    case FETCH_MOVIE_DETAIL:
      return {
        ...state,
        movie: action.payload,
      };
    default:
      return state;
  }
}

export default movieReducer;
