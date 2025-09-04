//order routes

import express from 'express';
import authMiddleware from '../middleware/auth.js';
// 1. Import paymentVerification and remove verifyOrder
import { listOrders, placeOrder, paymentVerification, updateStatus, userOrders } from '../controllers/orderController.js';

const orderRouter = express.Router();

// --- Existing Routes (Unchanged) ---
orderRouter.get("/list", listOrders);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/status", updateStatus);

// 2. Add the new route for Razorpay's payment verification callback
// This does not need authMiddleware because it's a server-to-server webhook/callback
orderRouter.post("/paymentverification", paymentVerification);

// 3. The old "/verify" route is no longer needed and has been removed

export default orderRouter;

