import { Router } from "express";
import {
  registerHospital,
  getAllHospitals,
} from "../controllers/hospital.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// ✅ Hospital routes
router.post("/register", verifyJWT, registerHospital);
router.get("/", getAllHospitals);

export default router;
