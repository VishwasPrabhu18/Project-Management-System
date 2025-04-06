import axios from "axios";

export const API_BASE_URL = "http://localhost:5454";

const axioApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const jwt = localStorage.getItem("token");

axioApi.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
axioApi.defaults.headers.post["Content-Type"] = "application/json";

export default axioApi;