import axioApi from "@/config/api";
import { ACCEPT_INVITATION_REQUEST, ACCEPT_INVITATION_SUCCESS, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, FETCH_PROJECT_BY_ID_REQUEST, FETCH_PROJECT_BY_ID_SUCCESS, FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS, INVITE_TO_PROJECT_REQUEST, INVITE_TO_PROJECT_SUCCESS, SEARCH_PROJECT_REQUEST, SEARCH_PROJECT_SUCCESS } from "./ActionType";

export const fetchProjects = ({ category, tags }) => async (dispatch) => {
  dispatch({ type: FETCH_PROJECTS_REQUEST });
  try {
    const { data } = await axioApi.get("/api/projects", {
      params: { category, tags },
    });
    dispatch({
      type: FETCH_PROJECTS_SUCCESS,
      projects: data,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);    
  }
}

export const searchProjects = ( keyword ) => async (dispatch) => {
  dispatch({ type: SEARCH_PROJECT_REQUEST });
  try {
    const { data } = await axioApi.get("/api/projects/search?keyword=" + keyword);
    dispatch({
      type: SEARCH_PROJECT_SUCCESS,
      projects: data,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);    
  }
}

export const createProject = ( projectData ) => async (dispatch) => {
  dispatch({ type: CREATE_PROJECT_REQUEST });
  try {
    const { data } = await axioApi.post("/api/projects", projectData);
    dispatch({
      type: CREATE_PROJECT_SUCCESS,
      project: data,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);    
  }
}

export const fetchProjectById = ( projectId ) => async (dispatch) => {
  dispatch({ type: FETCH_PROJECT_BY_ID_REQUEST });
  try {
    const { data } = await axioApi.get("/api/projects/" + projectId);
    dispatch({
      type: FETCH_PROJECT_BY_ID_SUCCESS,
      project: data,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);    
  }
}

export const deleteProject = ( projectId ) => async (dispatch) => {
  dispatch({ type: DELETE_PROJECT_REQUEST });
  try {
    await axioApi.delete("/api/projects/" + projectId);
    dispatch({
      type: DELETE_PROJECT_SUCCESS,
      projectId,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);    
  }
}

export const inviteToProject = ( {email, projectId} ) => async (dispatch) => {
  dispatch({ type: INVITE_TO_PROJECT_REQUEST });
  try {
    const { data } = await axioApi.post("/api/projects/invite", {
      email,
      projectId,
    });
    dispatch({
      type: INVITE_TO_PROJECT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);    
  }
}

export const acceptInvitation = ( {invitationToken, navigate} ) => async (dispatch) => {
  dispatch({ type: ACCEPT_INVITATION_REQUEST });
  try {
    const { data } = await axioApi.get("/api/projects/accept_invitation", {
      params: {
        token: invitationToken,
      }
    });
    navigate("/projects/" + data.projectId);
    dispatch({
      type: ACCEPT_INVITATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);    
  }
}
