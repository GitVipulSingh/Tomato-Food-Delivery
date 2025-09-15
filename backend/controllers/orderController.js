import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import { instance } from '../server.js';
import crypto from 'crypto';

// Place Order
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        const options = {
            amount: Math.round(req.body.amount * 100),
            currency: "INR",
            receipt: `${newOrder._id}`,
        };
        const order = await instance.orders.create(options);
        await orderModel.findByIdAndUpdate(newOrder._id, { "razorpay.order_id": order.id });
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("CRITICAL ERROR creating Razorpay order:", error);
        res.json({ success: false, message: "Error: Could not create Razorpay order." });
    }
};

// Update Order Status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated Successfully" });
    } catch (error) {
        console.log("Error updating status:", error);
        res.json({ success: false, message: "Error updating status" });
    }
};

// Verify Payment
const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest("hex");
    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        const order = await orderModel.findOne({ "razorpay.order_id": razorpay_order_id });
        if (order) {
            order.payment = true;
            order.razorpay.payment_id = razorpay_payment_id;
            order.razorpay.signature = razorpay_signature;
            await order.save();
        }
        // --- THIS IS THE FIX: Ensure it redirects to the frontend URL (port 5173) ---
        res.redirect(`${process.env.CORS_ORIGIN}/myorders`);
    } else {
        await orderModel.findOneAndDelete({ "razorpay.order_id": razorpay_order_id });
        // --- THIS IS THE FIX: Ensure the failure redirect also goes to the frontend ---
        res.redirect(`${process.env.CORS_ORIGIN}/myorders`);
    }
};

// User's Orders

const userOrders = async (req, res) => {

    try {

        // --- THE FIX: Add .sort() to get newest orders first ---

        const orders = await orderModel.find({ userId: req.body.userId }).sort({ date: -1 });

        res.json({ success: true, data: orders });

    } catch (error) {

        res.json({ success: false, message: "Error" });

    }

};



// All Orders (for Admin)
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        res.json({ success: false, message: "Error" });
    }
};

export { placeOrder, paymentVerification, userOrders, listOrders, updateStatus };

