import axioApi from "@/config/api";
import {
  ASSIGNED_ISSUE_TO_USER_FAILURE, ASSIGNED_ISSUE_TO_USER_REQUEST, ASSIGNED_ISSUE_TO_USER_SUCCESS,
  FETCH_ISSUE_BY_ID_FAILURE, FETCH_ISSUE_BY_ID_REQUEST, FETCH_ISSUE_BY_ID_SUCCESS,
  FETCH_ISSUE_FAILURE, FETCH_ISSUE_REQUEST, FETCH_ISSUE_SUCCESS,
  UPDATE_ISSUE_STATUS_FAILURE, UPDATE_ISSUE_STATUS_REQUEST, UPDATE_ISSUE_STATUS_SUCCESS
} from "./ActionType";

export const fetchIssues = (id) => async (dispatch) => {
  dispatch({ type: FETCH_ISSUE_REQUEST });
  try {
    const { data } = await axioApi.get(`/api/issues/project/${id}`);
    dispatch({
      type: FETCH_ISSUE_SUCCESS,
      issues: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ISSUE_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error fetch issue:", error);
  }
}

export const fetchIssueById = (issueId) => async (dispatch) => {
  dispatch({ type: FETCH_ISSUE_BY_ID_REQUEST });
  try {
    const { data } = await axioApi.get("/api/issues/" + issueId);
    dispatch({
      type: FETCH_ISSUE_BY_ID_SUCCESS,
      issues: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ISSUE_BY_ID_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error fetch issue by id:", error);
  }
}

export const updateIssueStatus = ({ id, status }) => async (dispatch) => {
  dispatch({ type: UPDATE_ISSUE_STATUS_REQUEST });
  try {
    const { data } = await axioApi.put(`/api/issues/${id}/status/${status}`);
    dispatch({
      type: UPDATE_ISSUE_STATUS_SUCCESS,
      issues: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ISSUE_STATUS_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error update issue status:", error);
  }
}

export const assignedUserToIssue = ({ issueId, userId }) => async (dispatch) => {
  dispatch({ type: ASSIGNED_ISSUE_TO_USER_REQUEST });
  try {
    const { data } = await axioApi.put(`/api/issues/${issueId}/assignee/${userId}`);
    dispatch({
      type: ASSIGNED_ISSUE_TO_USER_SUCCESS,
      issue: data,
    });
  } catch (error) {
    dispatch({
      type: ASSIGNED_ISSUE_TO_USER_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error assignedUserToIssue:", error);
  }
}