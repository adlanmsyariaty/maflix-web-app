import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import castReducer from "./castReducer";
import genreReducer from "./genreReducer.js";

const rootReducers = combineReducers({
    movie: movieReducer,
    genre: genreReducer,
    cast: castReducer
})

export default rootReducers