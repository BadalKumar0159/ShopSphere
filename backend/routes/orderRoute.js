import express from 'express'
import { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus } from "../controllers/orderController.js";
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/authUser.js';
import { verifyStripe } from '../controllers/orderController.js';
import { verifyRazorpay } from '../controllers/orderController.js';

const orderRouter = express.Router();

//Admin Features (req from admin panel)
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

//Payment Features (req from frontend)
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

// User Feature (to display on user's orders page)
orderRouter.post('/userorders', authUser, userOrders);

//verify payment
orderRouter.post('/verifyStripe', authUser,verifyStripe);
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay)

export default orderRouter;