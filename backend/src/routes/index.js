import { Router } from "express";
import userRoutes from "./user.routes.js";
import hospitalRoutes from "./hospital.routes.js";
import stockRoutes from "./stock.routes.js";
import requestRoutes from "./request.routes.js";

const router = Router();

// ✅ Master routes
router.use("/users", userRoutes);
router.use("/hospitals", hospitalRoutes);
router.use("/stocks", stockRoutes);
router.use("/requests", requestRoutes);

export default router;
