import { FETCH_GENRE_DATA, BASE_URL } from "./actionType";

export const fetchGenre = (payload) => {
  return {
    type: FETCH_GENRE_DATA,
    payload,
  };
};

export const loadGenres = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${BASE_URL}/users/genres`);
      const data = await response.json();
      if (!response.ok) {
        throw { message: data.message };
      }
      dispatch(fetchGenre(data));
      return data;
    } catch (error) {
      return error;
    }
  };
};
