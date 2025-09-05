import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

// 🏥 Hospital controllers
import {
  registerHospital,
  updateHospital,
  deleteHospital,
  getAllHospitals,
  getHospitalProfile,
} from "../controllers/hospital.controller.js";

// 🩸 Request controllers
import {
  getAllRequests,
  updateRequestStatus,
} from "../controllers/request.controller.js";

const router = Router();

// =============================
// 🔹 Hospital Management (Admin Only)
// =============================
router.post(
  "/hospital",
  verifyJWT,
  authorizeRoles("admin"),
  registerHospital
);

router.put(
  "/hospital/:id",
  verifyJWT,
  authorizeRoles("admin"),
  updateHospital
);

router.delete(
  "/hospital/:id",
  verifyJWT,
  authorizeRoles("admin"),
  deleteHospital
);

router.get(
  "/hospitals",
  verifyJWT,
  authorizeRoles("admin"),
  getAllHospitals
);

router.get(
  "/hospital/:id",
  verifyJWT,
  authorizeRoles("admin"),
  getHospitalProfile
);

// =============================
// 🔹 Request Management (Admin Only)
// =============================
router.get(
  "/requests",
  verifyJWT,
  authorizeRoles("admin"),
  getAllRequests
);

router.put(
  "/requests/:requestId",
  verifyJWT,
  authorizeRoles("admin"),
  updateRequestStatus
);

export default router;
