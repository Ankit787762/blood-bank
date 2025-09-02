// src/services/userService.js
import API from "./api";

export const registerUser = (userData) => API.post("/users/register", userData);
export const loginUser = (userData) => API.post("/users/login", userData);
export const getProfile = () => API.get("/users/profile");
