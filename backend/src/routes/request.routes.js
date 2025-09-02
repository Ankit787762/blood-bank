import { Router } from "express";
import {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequestStatus,
  deleteRequest,
} from "../controllers/request.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// ✅ Request routes
router.post("/", verifyJWT, createRequest);
router.get("/", getAllRequests);
router.get("/:requestId", getRequestById);
router.put("/:requestId", verifyJWT, updateRequestStatus);
router.delete("/:requestId", verifyJWT, deleteRequest);

export default router;
