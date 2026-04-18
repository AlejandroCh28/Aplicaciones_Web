import express from "express";
import { checkout } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/checkout", protect, authorizeRoles("buyer"), checkout);

export default router;