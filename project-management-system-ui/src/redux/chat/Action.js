import axioApi from "@/config/api";
import { FETCH_CHAT_BY_PROJECT_FAILURE, FETCH_CHAT_BY_PROJECT_REQUEST, FETCH_CHAT_BY_PROJECT_SUCCESS, FETCH_CHAT_MESSAGE_FAILURE, FETCH_CHAT_MESSAGE_REQUEST, FETCH_CHAT_MESSAGE_SUCCESS, SEND_MESSAGE_FAILURE, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from "./ActionType";

export const sendMessage = (messageData) => async (dispatch) => {
  dispatch({ type: SEND_MESSAGE_REQUEST });
  try {
    const { data } = await axioApi.post("/api/messages/send", messageData);
    dispatch({
      type: SEND_MESSAGE_SUCCESS,
      message: data,
    });
  } catch (error) {
    dispatch({
      type: SEND_MESSAGE_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error sending message:", error);    
  }
}

export const fetchChatByProject = (projectId) => async (dispatch) => {
  dispatch({ type: FETCH_CHAT_BY_PROJECT_REQUEST });
  try {
    const { data } = await axioApi.get(`/api/projects/${projectId}/chat`);
    dispatch({
      type: FETCH_CHAT_BY_PROJECT_SUCCESS,
      chat: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_CHAT_BY_PROJECT_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error sending message:", error);    
  }
}

export const fetchChatMessages = (chatId) => async (dispatch) => {
  dispatch({ type: FETCH_CHAT_MESSAGE_REQUEST });
  try {
    const { data } = await axioApi.get(`/api/messages/chat/${chatId}`);
    dispatch({
      type: FETCH_CHAT_MESSAGE_SUCCESS,
      messages: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_CHAT_MESSAGE_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error sending message:", error);    
  }
}