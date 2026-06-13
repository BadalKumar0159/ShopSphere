import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing orders using COD method
const placeOrder = async (req, res) => {
    try{
        const {userId, items, amount, address} = req.body;
        const orderData = {
            userId, items, address, 
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {cartData: {}});  //clear cart of user
        res.json({success: true, message: "Order Placed"});
    }catch(error){
        cosole.log(error);
        res.json({success: false, message: error.message});
    }
}
// Placing orders using Stripe method
const placeOrderStripe = async (req, res) => {

}
// Placing orders using Razorpay method
const placeOrderRazorpay = async (req, res) => {

}

// All Orders data for Admin Panel
const allOrders = async (req, res) => {

}

// User Order Data for Frontend
const userOrders = async (req, res) => {

}

// Update order status from admin panel
const updateStatus = async (req, res) => {

}

export {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus};