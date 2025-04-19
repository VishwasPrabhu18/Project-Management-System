import axioApi from "@/config/api";
import {
  ASSIGNED_ISSUE_TO_USER_FAILURE, ASSIGNED_ISSUE_TO_USER_REQUEST, ASSIGNED_ISSUE_TO_USER_SUCCESS,
  CREATE_ISSUE_FAILURE,
  CREATE_ISSUE_REQUEST,
  CREATE_ISSUE_SUCCESS,
  DELETE_ISSUE_FAILURE,
  DELETE_ISSUE_REQUEST,
  DELETE_ISSUE_SUCCESS,
  FETCH_ISSUE_BY_ID_FAILURE, FETCH_ISSUE_BY_ID_REQUEST, FETCH_ISSUE_BY_ID_SUCCESS,
  FETCH_ISSUE_FAILURE, FETCH_ISSUE_REQUEST, FETCH_ISSUE_SUCCESS,
  UPDATE_ISSUE_STATUS_FAILURE, UPDATE_ISSUE_STATUS_REQUEST, UPDATE_ISSUE_STATUS_SUCCESS
} from "./ActionType";

export const fetchIssues = (projectId) => async (dispatch) => {
  dispatch({ type: FETCH_ISSUE_REQUEST });
  try {
    const { data } = await axioApi.get(`/api/issues/project/${projectId}`);
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

export const createIssue = (issueData) => async (dispatch) => {
  dispatch({ type: CREATE_ISSUE_REQUEST });
  try {
    const { data } = await axioApi.post("/api/issues", issueData);
    dispatch({
      type: CREATE_ISSUE_SUCCESS,
      issues: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ISSUE_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error createIssue:", error);
  }
}

export const updateIssueStatus = ({ issueId, status }) => async (dispatch) => {
  dispatch({ type: UPDATE_ISSUE_STATUS_REQUEST });
  try {
    const { data } = await axioApi.put(`/api/issues/${issueId}/status/${status}`);
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

export const deleteIssue = ({ issueId }) => async (dispatch) => {
  dispatch({ type: DELETE_ISSUE_REQUEST });
  try {
    await axioApi.delete(`/api/issues/${issueId}`);
    dispatch({
      type: DELETE_ISSUE_SUCCESS,
      issueId: issueId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ISSUE_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error deleteIssue:", error);
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