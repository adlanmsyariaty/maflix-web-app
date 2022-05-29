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
  MOVIE_LOAD_STATUS,
  BASE_URL
} from "./actionType";

export const fetchMovie = (payload) => {
  return {
    type: FETCH_MOVIE_DATA,
    payload,
  };
};

export const changeFormStatus = (payload) => {
  return {
    type: CHANGE_FORM_STATUS_DATA,
    payload,
  };
};

export const movieCastData = (payload) => {
  return {
    type: FETCH_MOVIE_CAST_DATA,
    payload,
  };
};

export const updateDataById = (payload) => {
  return {
    type: UPDATE_DATA_BY_ID,
    payload,
  };
};

export const setUpdateMovieData = (payload) => {
  return {
    type: UPDATE_DATA,
    payload,
  };
};

export const setNewMovieData = (payload) => {
  return {
    type: NEW_MOVIE_DATA,
    payload,
  };
};

export const checkedDataCast = (payload) => {
  return {
    type: CHECKED_DATA_CAST,
    payload,
  };
};

export const checkedDataGenre = (payload) => {
  return {
    type: CHECKED_DATA_GENRE,
    payload,
  };
};

export const setNewGenreData = (payload) => {
  return {
    type: NEW_GENRE_DATA,
    payload,
  };
};

export const setNewCastData = (payload) => {
  return {
    type: NEW_CAST_DATA,
    payload,
  };
};

export const setMovieKeyword = (payload) => {
  return {
    type: MOVIE_KEYWORD_SEARCH,
    payload,
  };
};

export const setMovieLoadedStatus = (payload) => {
  return {
    type: MOVIE_LOAD_STATUS,
    payload,
  };
};

export const loadMovies = (search) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movies?search=${search}`, {
          headers: {
            access_token: localStorage.access_token
          }
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw {message: data.message}
      }
      dispatch(fetchMovie(data));
      return data
    } catch (error) {
      return error
    }
  };
};

export const deleteMovie = (id) => {
  return async (dispatch, getState) => {
    try {
      await fetch(`${BASE_URL}/movies/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token
        },
      });
      dispatch(loadMovies());
    } catch (error) {
      return error
    }
  };
};

export const addMovie = (newMovie, newGenres, newCasts) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${BASE_URL}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token
        },
        body: JSON.stringify({
          title: newMovie.title,
          trailerUrl: newMovie.trailerUrl,
          imgUrl: newMovie.imgUrl,
          rating: newMovie.rating,
          synopsis: newMovie.synopsis,
          genres: newGenres,
          casts: newCasts
        }),
      });
      const data = await response.json();
      if (data.message) throw {error: data.message}
      dispatch(loadMovies());
      return data
    } catch (error) {
      return error
    }
  };
};


export const showMovieCast = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movies/${id}`, {
          headers: {
            access_token: localStorage.access_token
          }
        }
      );
      const data = await response.json();
      dispatch(movieCastData(data.Casts));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateMovie = (
  newMovie,
  newGenres,
  newCasts,
  updateById,
  updateData
) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movies/${updateById}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.access_token
          },
          body: JSON.stringify({
            title: newMovie.title,
            trailerUrl: newMovie.trailerUrl,
            imgUrl: newMovie.imgUrl,
            rating: newMovie.rating,
            synopsis: newMovie.synopsis,
            genres: newGenres,
            casts: newCasts
          }),
        }
      );
      const data = await response.json();
      if (data.message) throw {error: data.message}
      dispatch(loadMovies());
      return data
    } catch (error) {
      return error
    }
  };
};

export const toUpdateMovie = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(changeFormStatus("Update"));
      dispatch(updateDataById(id));
      const response = await fetch(
        `${BASE_URL}/movies/${id}?_embed=movies_genres&_embed=movies_casts`, {
          headers: {
            access_token: localStorage.access_token
          }
        }
      );
      const data = await response.json();
      dispatch(setUpdateMovieData(data));
      dispatch(
        setNewMovieData({
          title: data.title,
          trailerUrl: data.trailerUrl,
          imgUrl: data.imgUrl,
          rating: data.rating,
          synopsis: data.synopsis,
        })
      );

      let dataGenres = {};
      let dataCasts = {};
      let idCasts = [];
      let idGenres = [];

      for (let i = 0; i < data.Genres.length; i++) {
        idGenres.push(data.Genres[i].id);
        dataGenres[data.Genres[i].name] = true;
      }

      for (let j = 0; j < data.Casts.length; j++) {
        idCasts.push(data.Casts[j].id);
        dataCasts[data.Casts[j].name] = true;
      }

      dispatch(setNewGenreData(idGenres));
      dispatch(setNewCastData(idCasts));
      dispatch(checkedDataGenre(dataGenres));
      dispatch(checkedDataCast(dataCasts));

    } catch (error) {
      console.log(error);
    }
  };
};
