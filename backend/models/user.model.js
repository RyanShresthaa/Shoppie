import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
    },
    mobile:{
        type: Number,
        default: null,
        index: {
            unique: true,
            partialFilterExpression: { mobile: { $exists: true, $ne: null } }
        }
    },
    avatar:{
        type: String,
        default: '',
    },
    refresh_token : {
        type: String,
        default: '',
    },
    verify_email : {
        type: Boolean,
        default: false,
    },
    last_login_date : {
        type: Date,
        default: "",
    },
    status : {
        type: String,
        enum: ['Active', 'Inactive', 'Suspended'],
        default: 'Active',
    },
    address_details : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "address",
    }],
    shopping_cart : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "cartProduct",
    }], 
    order_history : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "order",
    }], 
    forgot_password_otp : {
        type: String,
        default: '',
    },
    forgot_password_expiry : {
        type: Date,
        default: null,
    },
    role :{
        type: String,
        enum: ['User', 'Admin'],
        default: 'User',
    }
},
{ timestamps: true });

const UserModel =mongoose.model("user", userSchema);
export default UserModel;