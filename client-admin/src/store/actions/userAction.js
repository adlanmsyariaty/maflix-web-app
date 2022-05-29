import {
  BASE_URL
} from "./actionType";

export const addUser = (newUser) => {
    return async (dispatch, getState) => {
      try {
        const response = await fetch(`${BASE_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.access_token
          },
          body: JSON.stringify(newUser),
        })
        const data = await response.json()
        if (data.message) throw {message: data.message}
        return data
      } catch (error) {
        return error
      }
    };
  };

export const login = (user) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
      const data = await response.json()
      if (!data.access_token) throw {message: data.message}
      localStorage.setItem("access_token", data.access_token)
      return data
    } catch (error) {
      return error
    }
  };
}