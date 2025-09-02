// src/services/stockService.js
import API from "./api";

export const getStocks = () => API.get("/stocks");

export const createStock = (stockData) =>
  API.post("/stocks", stockData);
