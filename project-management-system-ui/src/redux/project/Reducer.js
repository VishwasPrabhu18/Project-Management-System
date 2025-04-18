import {
  FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS, FETCH_PROJECTS_FAILURE,
  FETCH_PROJECT_BY_ID_REQUEST, FETCH_PROJECT_BY_ID_SUCCESS, FETCH_PROJECT_BY_ID_FAILURE,
  CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE,
  SEARCH_PROJECT_REQUEST, SEARCH_PROJECT_SUCCESS, SEARCH_PROJECT_FAILURE,
  DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, DELETE_PROJECT_FAILURE,
  INVITE_TO_PROJECT_REQUEST, INVITE_TO_PROJECT_SUCCESS, INVITE_TO_PROJECT_FAILURE,
  ACCEPT_INVITATION_REQUEST, ACCEPT_INVITATION_SUCCESS, ACCEPT_INVITATION_FAILURE
} from "./ActionType"

const initialState = {
  projects: [],
  loading: false,
  error: null,
  projectDetails: null,
  searchProjects: [],
}

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
    case CREATE_PROJECT_REQUEST:
    case DELETE_PROJECT_REQUEST:
    case FETCH_PROJECT_BY_ID_REQUEST:
    case ACCEPT_INVITATION_REQUEST:
    case INVITE_TO_PROJECT_REQUEST:
    case SEARCH_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        projects: action.projects,
      };

    case SEARCH_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        searchProjects: action.projects,
      };

    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        projects: [...state.projects, action.project],
      };

    case FETCH_PROJECT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        projectDetails: action.project,
      };

    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        projects: state.projects.filter((project) => project.id !== action.projectId),
      };

    case FETCH_PROJECTS_FAILURE:
    case CREATE_PROJECT_FAILURE:
    case DELETE_PROJECT_FAILURE:
    case FETCH_PROJECT_BY_ID_FAILURE:
    case ACCEPT_INVITATION_FAILURE:
    case INVITE_TO_PROJECT_FAILURE:
    case SEARCH_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default: return state;
  }
}