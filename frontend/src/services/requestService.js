// src/services/requestService.js
import API from "./api";

export const getRequests = async () => {
  const res = await API.get("/requests");
  return res.data.data; // ✅ sirf array return kar raha hai
};

export const getMyRequests = async () => {
  const res = await API.get("/requests/my"); // agar my requests ka endpoint hai
  return res.data.data; // ✅ sirf array return kar raha hai
};

export const createRequest = async (requestData) => {
  const res = await API.post("/requests", requestData);
  return res.data.data; // ✅ sirf naya request object
};
