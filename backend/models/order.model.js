import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : "user",
        required: true,
    },
    orderId : {
        type : String,
        required : [true, "Provide order id"],
        unique : true
    },
    productId : {
        type : mongoose.Schema.ObjectId,
        ref: "product",
        required: true,
    },
    product_details : {
        name: String,
        image : Array
    },
    paymentId:{
        type : String,
        default : ""
    },
    payment_status : {
        type : String,
        default: ""
    },
    delivery_status : {
        type : String,
    },
    delivery_address : {
        type : mongoose.Schema.ObjectId,
        ref : "address"
    },
    subTotalAmt : {
        type : Number
    },
    totalAmt : {
        type : Number,
        default: 0,
    },
    invoice_receipt : {
        type : String
    }},
    {
        timestamps : true,
    },
)

const OrderModel = mongoose.model("order",orderSchema)
export default OrderModel;