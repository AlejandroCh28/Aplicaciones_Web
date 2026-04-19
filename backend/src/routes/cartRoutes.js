import express from "express";
import {
  getCart,
  addToCart,
  clearCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/my", protect, authorizeRoles("buyer"), getCart);
router.post("/add", protect, authorizeRoles("buyer"), addToCart);
router.put("/item/:productId", protect, authorizeRoles("buyer"), updateCartItemQuantity);
router.delete("/item/:productId", protect, authorizeRoles("buyer"), removeFromCart);
router.delete("/clear", protect, authorizeRoles("buyer"), clearCart);

export default router;