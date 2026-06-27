import API from "./api";

export const register = (userData) => {
  return API.post("/auth/signup", userData);
};

export const login = (userData) => {
  return API.post("/auth/login", userData);
};

export const getProfile = () => {
  return API.get("/auth/profile");
};

export const updateProfile = (data) => {
  return API.put("/auth/profile", data);
};