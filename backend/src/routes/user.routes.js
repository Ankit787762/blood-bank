import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
// import { parseForm } from "../middlewares/multer.middleware.js"; // 👈 ye add karo

const router = Router();

// ✅ Public routes
router.post("/register", registerUser);  // 👈 yaha lagana hoga
router.post("/login", loginUser);        // login me bhi form-data chahiye to lagao

// ✅ Protected routes
router.get("/profile", verifyJWT, getUserProfile);
router.put("/profile", verifyJWT, updateUserProfile);

export default router;
