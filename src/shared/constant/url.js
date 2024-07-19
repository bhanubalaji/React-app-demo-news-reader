import axios from "axios";
export const baseUrl = "http://localhost:4000";
const url = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true
});
url.interceptors.request.use(
  function (config) {
    console.log("=======config=============", config);
    config.withCredentials = true;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
url.interceptors.response.use(
  function (response) {
    console.log("=======response=============", response);
    return response;
  },
  function (error) {
    console.log("=======error=============", error);
    if (error && error?.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    return Promise.reject(error);
  }
);
export default url;