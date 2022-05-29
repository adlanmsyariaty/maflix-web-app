import { combineReducers } from "redux";
import genreReducer from "./genreReducer";
import castReducer from "./castReducer";
import movieReducer from "./movieReducer";

const rootReducers = combineReducers({
    genre: genreReducer,
    cast: castReducer,
    movie: movieReducer,
})

export default rootReducers