import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Hospital } from "../models/hospital.model.js";
import mongoose from "mongoose";

// ✅ Register Hospital
const registerHospital = asyncHandler(async (req, res) => {
  const { name, email, phone, address } = req.body;

  if ([name, email, phone, address].some((field) => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  const existedHospital = await Hospital.findOne({ $or: [{ email }, { phone }] });

  if (existedHospital) {
    throw new ApiError(409, "Hospital with email or phone already exists");
  }

  const hospital = await Hospital.create({
    name,
    email,
    phone,
    address,
  });

  if (!hospital) {
    throw new ApiError(500, "Something went wrong while registering hospital");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, hospital, "Hospital registered successfully"));
});

// ✅ Get Hospital Profile
const getHospitalProfile = asyncHandler(async (req, res) => {
  const hospitalId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(hospitalId)) {
    throw new ApiError(400, "Invalid Hospital ID");
  }

  const hospital = await Hospital.findById(hospitalId);

  if (!hospital) {
    throw new ApiError(404, "Hospital not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, hospital, "Hospital profile fetched successfully"));
});

// ✅ Update Hospital
const updateHospital = asyncHandler(async (req, res) => {
  const hospitalId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(hospitalId)) {
    throw new ApiError(400, "Invalid Hospital ID");
  }

  const { name, email, phone, address } = req.body;

  const updatedHospital = await Hospital.findByIdAndUpdate(
    hospitalId,
    { $set: { name, email, phone, address } },
    { new: true }
  );

  if (!updatedHospital) {
    throw new ApiError(404, "Hospital not found or update failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedHospital, "Hospital updated successfully"));
});

// ✅ Delete Hospital
const deleteHospital = asyncHandler(async (req, res) => {
  const hospitalId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(hospitalId)) {
    throw new ApiError(400, "Invalid Hospital ID");
  }

  const deletedHospital = await Hospital.findByIdAndDelete(hospitalId);

  if (!deletedHospital) {
    throw new ApiError(404, "Hospital not found or delete failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Hospital deleted successfully"));
});

// ✅ Get All Hospitals
const getAllHospitals = asyncHandler(async (req, res) => {
  const hospitals = await Hospital.find();

  return res
    .status(200)
    .json(new ApiResponse(200, hospitals, "Hospitals fetched successfully"));
});

export {
  registerHospital,
  getHospitalProfile,
  updateHospital,
  deleteHospital,
  getAllHospitals,
};
