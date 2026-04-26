import axios from "axios";

const authApiClient = axios.create({
  baseURL: "https://snap-book.vercel.app/api",
});

authApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authTokens");

    if (token) {
      const access = JSON.parse(token).access;
      config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default authApiClient;