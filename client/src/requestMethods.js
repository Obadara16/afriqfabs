import axios from "axios";

// export const BASE_URL = "http://localhost:5000/api/";
export const BASE_URL = "https://afrimart-backend.onrender.com/api/";


const userJSON = localStorage.getItem("persist:root");
const user = userJSON ? JSON.parse(userJSON).user : null;

// console.log("this is the faulty user", user)

const currentUser = user && JSON.parse(user).currentUser;
// console.log("this is the faulty current user", currentUser)


const ACCESS_TOKEN = currentUser?.tokens?.accessToken || null;
const REFRESH_TOKEN = currentUser?.tokens?.refreshToken || null;

// console.log(currentUser)

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const authedRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
})

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const refreshAccessToken = async () => {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  try {
    console.log("this was started")
    const res = await axios.post(`${BASE_URL}auth/refresh-token`, {
      refreshToken: REFRESH_TOKEN,
    });
    if (res.status === 200) {
      console.log(res.data)
      localStorage.setItem(
        "persist:root",
        JSON.stringify({
          user: {
            currentUser: {
              tokens: {
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
              },
            },
          },
        })
      );

      userRequest.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.accessToken}`;

      processQueue(null, res.data.accessToken);
      return res.data.accessToken;
    }
  } catch (err) {
    console.error("Failed to refresh access token", err);
    processQueue(err, null);
    return false;
  } finally {
    isRefreshing = false;
  }
};

userRequest.interceptors.request.use(
  async (config) => {
    const token = ACCESS_TOKEN;
    if (token) {
      const { exp } = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      if (exp < currentTime) {
        try {
          const newToken = await refreshAccessToken();
          config.headers["Authorization"] = `Bearer ${newToken}`;
        } catch (error) {
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
      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);