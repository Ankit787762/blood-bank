// src/services/hospitalService.js
import API from "./api";

export const getHospitals = () => API.get("/hospitals");

export const createHospital = (hospitalData) =>
  API.post("/hospitals", hospitalData);
