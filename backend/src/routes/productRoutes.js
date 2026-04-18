import express from 'express';
import { getProducts, getProductById, createProduct, deleteProduct, updateProduct } from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", protect, authorizeRoles('seller'), deleteProduct);
router.post("/", protect, authorizeRoles('seller'), createProduct);
router.put("/:id", protect, authorizeRoles('seller'), updateProduct);


export default router;