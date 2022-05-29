import { FETCH_GENRE_DATA, BASE_URL } from "./actionType";

export const fetchGenre = (payload) => {
  return {
    type: FETCH_GENRE_DATA,
    payload,
  };
};

export const loadGenres = () => {
  return (dispatch, getState) => {
    return fetch(`${BASE_URL}/genres`, {
      headers: {
        access_token: localStorage.access_token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.message) {
          dispatch(fetchGenre(data))
        }
        return data
      })
  };
};

export const deleteGenre = (id) => {
  return (dispatch, getState) => {
    return fetch(`${BASE_URL}/genres/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token
      },
    })
      .then(() => dispatch(loadGenres()))
  };
};

export const addGenre = (newGenre) => {
  return (dispatch, getState) => {
    return fetch(`${BASE_URL}/genres`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token
      },
      body: JSON.stringify(newGenre),
    })
      .then((response) => {
        dispatch(loadGenres())
        return response.json()
      })
      .then((data) => data)
  };
};