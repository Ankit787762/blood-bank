import { Router } from "express";
import userRoutes from "./user.routes.js";
import hospitalRoutes from "./hospital.routes.js";
import stockRoutes from "./stock.routes.js";
import requestRoutes from "./request.routes.js";
import adminRoutes from "./admin.routes.js";
import verifyRoutes from "./verify.routes.js";

const router = Router();

// ✅ Master routes
router.use("/users", userRoutes);
router.use("/hospitals", hospitalRoutes);
router.use("/stocks", stockRoutes);
router.use("/requests", requestRoutes);
router.use("/admin", adminRoutes);
router.use("/auth", verifyRoutes);
export default router;
