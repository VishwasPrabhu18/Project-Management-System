import axioApi from "@/config/api";
import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, FETCH_COMMENTS_FAILURE, FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS } from "./ActionType";

export const createComment = (commentData) => async (dispatch) => {
  dispatch({ type: CREATE_COMMENT_REQUEST });
  try {
    const { data } = await axioApi.post("/api/comments", commentData);
    dispatch({
      type: CREATE_COMMENT_SUCCESS,
      comment: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_COMMENT_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error sending message:", error);    
  }
}

export const deleteComment = (commentId) => async (dispatch) => {
  dispatch({ type: DELETE_COMMENT_REQUEST });
  try {
    await axioApi.delete(`/api/comments/${commentId}`);
    dispatch({
      type: DELETE_COMMENT_SUCCESS,
      commentId
    });
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error sending message:", error);    
  }
}

export const fetchComments = (issueId) => async (dispatch) => {
  dispatch({ type: FETCH_COMMENTS_REQUEST });
  try {
    const { data } = await axioApi.get(`/api/comments/${issueId}`);
    dispatch({
      type: FETCH_COMMENTS_SUCCESS,
      comments: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_COMMENTS_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error sending message:", error);    
  }
}