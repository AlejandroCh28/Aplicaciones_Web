import express from "express";
import { checkout, getMyOrders } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/checkout", protect, authorizeRoles("buyer"), checkout);
router.get("/my", protect, authorizeRoles("buyer"), getMyOrders);

export default router;