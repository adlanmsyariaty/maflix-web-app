import {
  FETCH_MOVIE_DATA,
  BASE_URL,
  FETCH_MOVIE_DETAIL
} from "./actionType";

export const fetchMovie = (payload) => {
  return {
    type: FETCH_MOVIE_DATA,
    payload,
  };
};

export const fetchDetailMovie = (payload) => {
  return {
    type: FETCH_MOVIE_DETAIL,
    payload,
  };
};

export const loadMovies = (search) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `${BASE_URL}/users/movies?search=${search}`
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

export const loadMoviesByGenre = (genreId, castId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `${BASE_URL}/users/movies/genres?genre=${genreId}&cast=${castId}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw {message: data.message}
      }
      let movieByGenre = []
      data.forEach(el => {
        if (el.Movie) {
          movieByGenre.push(el.Movie)
        }
      });
      return movieByGenre
    } catch (error) {
      return error
    }
  };
};

export const loadMoviesByCast = (castId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `${BASE_URL}/users/movies/casts?cast=${castId}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw {message: data.message}
      }
      let movieByCast= []
      data.forEach(el => {
        if (el.Movie) {
          movieByCast.push(el.Movie)
        }
      });
      return movieByCast
    } catch (error) {
      return error
    }
  };
};

export const loadMovieDetail = (movieId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `${BASE_URL}/users/movies/${movieId}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw {message: data.message}
      }
      return data
    } catch (error) {
      return error
    }
  };
};