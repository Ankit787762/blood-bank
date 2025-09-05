import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/verify", verifyJWT, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Token is valid",
    user: req.user, // optional: user data bhej sakte ho
  });
});

export default router;
