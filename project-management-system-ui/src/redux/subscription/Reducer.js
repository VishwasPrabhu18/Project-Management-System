import { GET_USER_SUBSCRIPTION_FAILURE, GET_USER_SUBSCRIPTION_REQUEST, GET_USER_SUBSCRIPTION_SUCCESS, UPGRADE_SUBSCRIPTION_FAILURE, UPGRADE_SUBSCRIPTION_REQUEST, UPGRADE_SUBSCRIPTION_SUCCESS } from "./ActionType";


const initialState = {
  loading: false,
  error: null,
  userSubscription: null,
}

export const subscriptioneReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SUBSCRIPTION_REQUEST:
    case UPGRADE_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_USER_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userSubscription: action.payload,
      };

    case UPGRADE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userSubscription: action.payload,
      };

    case GET_USER_SUBSCRIPTION_FAILURE:
    case UPGRADE_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default: return state;
  }
}