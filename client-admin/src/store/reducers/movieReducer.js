import {
  FETCH_MOVIE_DATA,
  CHANGE_FORM_STATUS_DATA,
  FETCH_MOVIE_CAST_DATA,
  UPDATE_DATA_BY_ID,
  UPDATE_DATA,
  NEW_MOVIE_DATA,
  CHECKED_DATA_CAST,
  CHECKED_DATA_GENRE,
  NEW_GENRE_DATA,
  NEW_CAST_DATA,
  MOVIE_KEYWORD_SEARCH,
  MOVIE_LOAD_STATUS
} from "../actions/actionType";

const initialState = {
  movies: [],
  formStatus: "",
  movieCast: [],
  updateById: "",
  updateData: [],
  newMovie: {
    title: "",
    trailerUrl: "",
    imgUrl: "",
    rating: "",
    synopsis: "",
  },
  checkedItemsCast: {},
  checkedItemsGenre: {},
  newGenres: [],
  newCasts: [],
  movieKeyword: '',
  isMovieLoaded: true
};

function movieReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIE_DATA:
      return {
        ...state,
        movies: action.payload,
      };
    case CHANGE_FORM_STATUS_DATA:
      return {
        ...state,
        formStatus: action.payload,
      };
    case FETCH_MOVIE_CAST_DATA:
      return {
        ...state,
        movieCast: action.payload,
      };
    case UPDATE_DATA_BY_ID:
      return {
        ...state,
        updateById: action.payload,
      };
    case UPDATE_DATA:
      return {
        ...state,
        updateData: action.payload,
      };
    case NEW_MOVIE_DATA:
      return {
        ...state,
        newMovie: action.payload,
      };
    case CHECKED_DATA_CAST:
      return {
        ...state,
        checkedItemsCast: action.payload,
      };
    case CHECKED_DATA_GENRE:
      return {
        ...state,
        checkedItemsGenre: action.payload,
      };
    case NEW_GENRE_DATA:
      return {
        ...state,
        newGenres: action.payload,
      };
    case NEW_CAST_DATA:
      return {
        ...state,
        newCasts: action.payload,
      };
    case MOVIE_KEYWORD_SEARCH:
      return {
        ...state,
        movieKeyword: action.payload,
      };
    case MOVIE_LOAD_STATUS:
      return {
        ...state,
        isMovieLoaded: action.payload,
      };
    default:
      return state;
  }
}

export default movieReducer;
