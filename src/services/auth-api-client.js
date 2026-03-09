import axios from "axios";

const authApiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

authApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authTokens");

    if (token) {
      const access = JSON.parse(token).access;
      config.headers.Authorization = `JWT ${access}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default authApiClient;