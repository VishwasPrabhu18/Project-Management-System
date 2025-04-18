import axios from "axios";
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
import { API_BASE_URL } from "@/config/api";

export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    if (data.jwt) {
      localStorage.setItem("token", data.jwt);
      dispatch({ type: REGISTER_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error register:", error);
  }
}

export const login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    localStorage.setItem("token", data.jwt);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error login:", error);
  }
}

export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error getUser:", error);
  }
}

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem("token");
}