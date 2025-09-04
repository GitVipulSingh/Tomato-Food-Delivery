import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Food Processing" },
    date: { type: Date, default: Date.now() },
    payment: { type: Boolean, default: false },
    // --- ADDED THIS SECTION ---
    // This object will store details from Razorpay for our records
    razorpay: {
        order_id: { type: String },
        payment_id: { type: String },
        signature: { type: String },
    }
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;

