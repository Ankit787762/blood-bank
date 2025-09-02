// src/middlewares/role.middleware.js
import { ApiError } from "../utils/ApiError.js";

// ✅ Check if logged-in user has required role
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, "User not authenticated");
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, `Role: ${req.user.role} is not allowed to access this resource`);
    }

    next();
  };
};
