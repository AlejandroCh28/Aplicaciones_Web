import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  createManyProducts,
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/", protect, authorizeRoles("seller"), createProduct);
router.post("/bulk", protect, authorizeRoles("seller"), createManyProducts);

router.put("/:id", protect, authorizeRoles("seller"), updateProduct);
router.delete("/:id", protect, authorizeRoles("seller"), deleteProduct);

export default router;