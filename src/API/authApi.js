import API from "../service";

export const registerUserAPI = (payload) => {
  return API.post("/user/signup", payload);
};

export const loginUserAPI = (payload) => {
  return API.post("/user/login", payload);
};

export const getUserDetail = () => {
  return API.get("/user");
};

export const getDashboardData = () => {
  return API.get("/user/dashboard");
};
