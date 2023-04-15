import axios from "axios";

export const BASE_URL = "http://localhost:5000/api/";
// export const BASE_URL = "https://afrimart-backend.onrender.com/api/";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const ACCESS_TOKEN = currentUser?.tokens?.accessToken;
const REFRESH_TOKEN = currentUser?.tokens?.refreshToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

const refreshAccessToken = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/refresh-token`, {
      refreshToken: REFRESH_TOKEN,
    });
    if (res.status === 200) {
      localStorage.setItem(
        "persist:root",
        JSON.stringify({
          user: {
            currentUser: {
              tokens: {
                accessToken: res.data.accessToken,
                refreshToken: REFRESH_TOKEN,
              },
            },
          },
        })
      );

      userRequest.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.accessToken}`;

      return true;
    }
  } catch (err) {
    console.error("Failed to refresh access token", err);
    return false;
  }
};

userRequest.interceptors.request.use(
  async (config) => {
    const token = ACCESS_TOKEN;
    if (token) {
      const { exp } = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      if (exp < currentTime) {
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
          throw new Error("Failed to refresh access token");
        }
      }
      config.headers["Authorization"] = `Bearer ${ACCESS_TOKEN}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

userRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      ACCESS_TOKEN
    ) {
      originalRequest._retry = true;
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
