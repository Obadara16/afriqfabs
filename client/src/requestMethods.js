import axios from "axios";

export const BASE_URL = "https://afrimart-backend.onrender.com/api/";
// export const BASE_URL = 'http://localhost:5000/api/'

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.token
console.log(TOKEN)

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});


userRequest.interceptors.request.use(
  (config) => {
    const token = TOKEN;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
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
      TOKEN
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(`${BASE_URL}/refresh_token`, {
          token: TOKEN,
        });
        if (res.status === 200) {
          localStorage.setItem("persist:root", JSON.stringify({
            user: {
              currentUser: {
                token: res.data.token
              }
            }
          }));
          
          userRequest.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.token;
          return axios(originalRequest);
        }
      } catch (err) {
        console.error('this is the error:', err);
      }
    }
    return Promise.reject(error);
  }
);



