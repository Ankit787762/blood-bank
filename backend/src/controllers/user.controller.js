import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Register user
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  if (!fullName || !email || !username || !password) {
    throw new ApiError(400, "All required fields must be provided");
  }

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    throw new ApiError(400, "User with this email or username already exists");
  }

  // const hashedPassword = await bcrypt.hash(password, 10);  // already hasing in user.model so no need again hashing here

  const user = await User.create({
    fullName,
    email,
    username,
    password
  });

  return res.status(201).json(new ApiResponse(201, user, "User registered successfully"));
});


// ✅ Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  // 🔹 Token banate time role include kar
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // 🔹 Password, refreshToken remove karke safe user bhejna
  const safeUser = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    username: user.username,
    role: user.role,
  };

  return res.status(200).json(
    new ApiResponse(200, { user: safeUser, token }, "Login successful")
  );
});


// ✅ Get current user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully"));
});

// ✅ Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const { fullName, email, username, phone, bloodGroup } = req.body;

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.fullName = fullName || user.fullName;
  user.email = email || user.email;
  user.username = username || user.username;
  user.phone = phone || user.phone;
  user.bloodGroup = bloodGroup || user.bloodGroup;

  await user.save();

  return res.status(200).json(new ApiResponse(200, user, "User profile updated successfully"));
});

// ✅ Get all donors
const getAllDonors = asyncHandler(async (req, res) => {
  const donors = await User.find({ role: "donor" }).select("-password -refreshToken");

  if (!donors.length) {
    throw new ApiError(404, "No donors found");
  }

  return res.status(200).json(new ApiResponse(200, donors, "All donors fetched successfully"));
});

// ✅ Get donor by ID
const getDonorById = asyncHandler(async (req, res) => {
  const { donorId } = req.params;

  const donor = await User.findById(donorId).select("-password -refreshToken");

  if (!donor) {
    throw new ApiError(404, "Donor not found");
  }

  return res.status(200).json(new ApiResponse(200, donor, "Donor details fetched successfully"));
});

  // verify user
 const verifyUser = (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, { user: req.user }, "Token is valid"));
};
// ✅ Export all controllers
export {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllDonors,
  getDonorById,
  verifyUser
};
