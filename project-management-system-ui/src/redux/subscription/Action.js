import axioApi from "@/config/api";
import {
  GET_USER_SUBSCRIPTION_FAILURE, GET_USER_SUBSCRIPTION_REQUEST, GET_USER_SUBSCRIPTION_SUCCESS,
  UPGRADE_SUBSCRIPTION_FAILURE,
  UPGRADE_SUBSCRIPTION_REQUEST,
  UPGRADE_SUBSCRIPTION_SUCCESS,

} from "./ActionType";

export const getUserSubscription = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_SUBSCRIPTION_REQUEST });
  try {
    const { data } = await axioApi.get(`/api/subscriptions/user`, {
      headers: {
        "Authorization": `Bearer ${jwt}`,
      },
    });
    dispatch({
      type: GET_USER_SUBSCRIPTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_SUBSCRIPTION_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error getSubscription:", error);
  }
}

export const upgradeSubscription = ({planType}) => async (dispatch) => {
  dispatch({ type: UPGRADE_SUBSCRIPTION_REQUEST });
  try {
    const { data } = await axioApi.patch("/api/subscriptions/upgrade/", null, {
      params: { planType },
    });
    dispatch({
      type: UPGRADE_SUBSCRIPTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPGRADE_SUBSCRIPTION_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error upgradeSubscription:", error);
  }
}