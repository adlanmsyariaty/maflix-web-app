import {
  FETCH_CAST_DATA,
  BASE_URL
} from "./actionType";

export const fetchCast = (payload) => {
  return {
    type: FETCH_CAST_DATA,
    payload,
  };
};

export const loadCasts = (search) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `${BASE_URL}/users/casts?search=${search}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw {message: data.message}
      }
      dispatch(fetchCast(data));
      return data
    } catch (error) {
      return error
    }
  };
};