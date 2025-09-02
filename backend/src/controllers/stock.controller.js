import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Stock } from "../models/stock.model.js";

// ➕ Add Stock
const addStock = asyncHandler(async (req, res) => {
  const { bloodGroup, units } = req.body;
  const hospitalId = req.user?._id; // JWT se hospital id

  if (!bloodGroup || !units) {
    throw new ApiError(400, "Blood group and units are required");
  }

  const stock = await Stock.create({
    hospital: hospitalId,
    bloodGroup,
    units,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, stock, "Stock added successfully"));
});

// ✏️ Update Stock
const updateStock = asyncHandler(async (req, res) => {
  const { stockId } = req.params;
  const { units } = req.body;

  let stock = await Stock.findById(stockId);

  if (!stock) {
    throw new ApiError(404, "Stock not found");
  }

  stock.units = units;
  await stock.save();

  return res
    .status(200)
    .json(new ApiResponse(200, stock, "Stock updated successfully"));
});

// ❌ Delete Stock
const deleteStock = asyncHandler(async (req, res) => {
  const { stockId } = req.params;

  const stock = await Stock.findById(stockId);

  if (!stock) {
    throw new ApiError(404, "Stock not found");
  }

  await stock.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Stock deleted successfully"));
});

// 📥 Get Stock (Hospital-wise)
const getStock = asyncHandler(async (req, res) => {
  const hospitalId = req.user?._id;

  const stock = await Stock.find({ hospital: hospitalId });

  return res
    .status(200)
    .json(new ApiResponse(200, stock, "Hospital stock fetched successfully"));
});

export { addStock, updateStock, deleteStock, getStock };
