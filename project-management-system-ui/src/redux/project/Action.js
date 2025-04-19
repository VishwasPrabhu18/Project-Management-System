import axioApi from "@/config/api";
import { ACCEPT_INVITATION_FAILURE, ACCEPT_INVITATION_REQUEST, ACCEPT_INVITATION_SUCCESS, CREATE_PROJECT_FAILURE, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, DELETE_PROJECT_FAILURE, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, FETCH_PROJECT_BY_ID_FAILURE, FETCH_PROJECT_BY_ID_REQUEST, FETCH_PROJECT_BY_ID_SUCCESS, FETCH_PROJECTS_FAILURE, FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS, INVITE_TO_PROJECT_FAILURE, INVITE_TO_PROJECT_REQUEST, INVITE_TO_PROJECT_SUCCESS, SEARCH_PROJECT_FAILURE, SEARCH_PROJECT_REQUEST, SEARCH_PROJECT_SUCCESS } from "./ActionType";

export const fetchProjects = ({ category, tag }) => async (dispatch) => {
  dispatch({ type: FETCH_PROJECTS_REQUEST });
  try {
    const { data } = await axioApi.get("/api/projects", {
      params: { category, tag },
    });
    dispatch({
      type: FETCH_PROJECTS_SUCCESS,
      projects: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PROJECTS_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error fetchProjects:", error);
  }
}

export const searchProjects = (keyword) => async (dispatch) => {
  dispatch({ type: SEARCH_PROJECT_REQUEST });
  try {
    const { data } = await axioApi.get("/api/projects/search?keyword=" + keyword);
    dispatch({
      type: SEARCH_PROJECT_SUCCESS,
      projects: data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_PROJECT_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error searchProjects:", error);
  }
}

export const createProject = (projectData) => async (dispatch) => {
  dispatch({ type: CREATE_PROJECT_REQUEST });
  try {
    const { data } = await axioApi.post("/api/projects", projectData);
    dispatch({
      type: CREATE_PROJECT_SUCCESS,
      project: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PROJECT_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error createProject:", error);
  }
}

export const fetchProjectById = (projectId) => async (dispatch) => {
  dispatch({ type: FETCH_PROJECT_BY_ID_REQUEST });
  try {
    const { data } = await axioApi.get("/api/projects/" + projectId);
    dispatch({
      type: FETCH_PROJECT_BY_ID_SUCCESS,
      project: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PROJECT_BY_ID_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error fetchProjectById:", error);
  }
}

export const deleteProject = (projectId) => async (dispatch) => {
  dispatch({ type: DELETE_PROJECT_REQUEST });
  try {
    await axioApi.delete("/api/projects/" + projectId);
    dispatch({
      type: DELETE_PROJECT_SUCCESS,
      projectId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PROJECT_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error deleteProject:", error);
  }
}

export const inviteToProject = ({ email, projectId }) => async (dispatch) => {
  dispatch({ type: INVITE_TO_PROJECT_REQUEST });
  try {
    const { data } = await axioApi.post("/api/projects/invite", {
      email,
      projectId,
    }, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    dispatch({
      type: INVITE_TO_PROJECT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INVITE_TO_PROJECT_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error inviteToProject:", error);
  }
}

export const acceptInvitation = ({ invitationToken, navigate }) => async (dispatch) => {
  dispatch({ type: ACCEPT_INVITATION_REQUEST });
  try {
    const { data } = await axioApi.post("/api/projects/accept_invitation", null, {
      params: {
        token: invitationToken,
      }
    }, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    navigate("/projects/" + data.projectId);
    dispatch({
      type: ACCEPT_INVITATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACCEPT_INVITATION_FAILURE,
      error: error.response ? error.response.data : "An error occurred",
    });
    console.error("Error acceptInvitation:", error);
  }
}
