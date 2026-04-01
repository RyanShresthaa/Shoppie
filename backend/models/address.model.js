import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    address_line : {
        type: String,
        required: [true, 'Address line is required'],
        default: '',
    },
    city : {
        type: String,
        required: [true, 'City is required'],
        default: '',
    },
    state : {
        type: String,   
        default: '',
    },
    pincode : {
        type: Number,
        required: [true, 'Pincode is required'],
        default: null,
    },
    country : {
        type: String,
        required: [true, 'Country is required'],
        default: '',
    },
    mobile : {
        type: Number,
        required: [true, 'Mobile number is required'],
        default: null,
    },
}, { timestamps: true });

export const AddressModel = mongoose.model('address', addressSchema);
export default AddressModel;