import { FETCH_CAST_DATA, BASE_URL } from "./actionType";

export const fetchCast = (payload) => {
  return {
    type: FETCH_CAST_DATA,
    payload,
  };
};

export const loadCasts = (cast) => {
  return (dispatch, getState) => {
    return fetch(`${BASE_URL}/casts?search=${cast}`, {
      headers: {
        access_token: localStorage.access_token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.message) {
          dispatch(fetchCast(data))
        }
        return data
      })
  };
};

export const deleteCast = (id) => {
  return (dispatch, getState) => {
    return fetch(`${BASE_URL}/casts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token
      },
    })
      .then(() => dispatch(loadCasts()))
  };
};

export const addCast = (newCast) => {
  return (dispatch, getState) => {
    return fetch(`${BASE_URL}/casts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token
      },
      body: JSON.stringify(newCast),
    })
      .then((response) => {
        dispatch(loadCasts())
        return response.json()
      })
      .then((data) => data)
  };
};

