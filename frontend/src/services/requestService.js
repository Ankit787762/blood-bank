// src/services/requestService.js
import API from "./api";

export const getRequests = () => API.get("/requests");

export const createRequest = (requestData) =>
  API.post("/requests", requestData);
