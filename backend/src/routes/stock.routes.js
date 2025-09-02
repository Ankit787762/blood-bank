import { Router } from "express";
import {
  addStock,
  getStock,
  updateStock,
  deleteStock,
} from "../controllers/stock.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// ➕ Add Stock
router.post("/", verifyJWT, addStock);

// 📥 Get Hospital Stock
router.get("/", verifyJWT, getStock);

// ✏️ Update Stock
router.put("/:stockId", verifyJWT, updateStock);

// ❌ Delete Stock
router.delete("/:stockId", verifyJWT, deleteStock);

export default router;
