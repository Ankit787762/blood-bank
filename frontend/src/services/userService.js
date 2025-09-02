// src/services/userService.js
import API from "./api";

export const registerUser = (userData) => {
  return API.post("/users/register", userData, {
    headers: { "Content-Type": "application/json" },
  });
};

export const loginUser = (userData) => {
  return API.post("/users/login", userData, {
    headers: { "Content-Type": "application/json" },
  });
};

export const getProfile = () => API.get("/users/profile");
