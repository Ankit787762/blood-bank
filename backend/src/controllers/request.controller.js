import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { BloodRequest } from "../models/request.model.js";
import { User } from "../models/user.model.js";
import { Hospital } from "../models/hospital.model.js";

// ✅ Create new blood request
const createRequest = asyncHandler(async (req, res) => {
  const { bloodGroup, units, hospital } = req.body;

  if (!bloodGroup || !units || !hospital) {
    throw new ApiError(400, "Blood type, units and hospital are required");
  }

  const newRequest = await BloodRequest.create({
    user: req.user?._id,
    bloodGroup,
    units,
    hospital,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newRequest, "Blood request created successfully"));
});

// ✅ Get all requests
const getAllRequests = asyncHandler(async (req, res) => {
  const requests = await BloodRequest.find()
    .populate("user", "fullName email phone bloodGroup")
    .populate("hospital", "name location contact");

  return res
    .status(200)
    .json(new ApiResponse(200, requests, "All requests fetched successfully"));
});

// ✅ Get single request by ID
const getRequestById = asyncHandler(async (req, res) => {
  const { requestId } = req.params;

  const request = await BloodRequest.findById(requestId)
    .populate("user", "fullName email phone bloodGroup")
    .populate("hospital", "name location contact");

  if (!request) {
    throw new ApiError(404, "Request not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, request, "Request details fetched successfully"));
});


const getMyRequests = asyncHandler(async (req, res) => {
  const requests = await BloodRequest.find({ user: req.user?._id })
    .populate("hospital", "name location contact");

  return res
    .status(200)
    .json(new ApiResponse(200, requests, "Your requests fetched successfully"));
});


// ✅ Update request status
const updateRequestStatus = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;

  if (!["pending", "approved", "rejected", "fulfilled"].includes(status)) {
    throw new ApiError(400, "Invalid status value");
  }

  const request = await BloodRequest.findById(requestId);

  if (!request) {
    throw new ApiError(404, "Request not found");
  }

  request.status = status;
  await request.save();

  return res
    .status(200)
    .json(new ApiResponse(200, request, "Request status updated successfully"));
});

// ✅ Delete request
const deleteRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.params;

  const request = await BloodRequest.findByIdAndDelete(requestId);

  if (!request) {
    throw new ApiError(404, "Request not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Request deleted successfully"));
});

// ✅ Export all controllers
export {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequestStatus,
  deleteRequest,
  getMyRequests, 
};
