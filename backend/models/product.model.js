import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
    },
    image : {
        type: Array,
        required: [true, 'Product image is required'],
    },
    category : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "category",
        required: [true, 'Category ID is required'],
    }],
    subcategory : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "subcategory",
    }],
    unit : {
        type: String,
        default: '',
    },
    stock : {
        type: Number,
    },
    price : {
        type: Number,
        default: 0,
       },
    discount : {
        type: Number,
        default: 0,
    },
    description : {
        type: String,
        default: '',
    },
    more_details : {
        type: Object,
        default: {},
    },
    publish: {
        type: Boolean,
        default: true,
    },
},
 { timestamps: true });

 const ProductModel = mongoose.model('product', productSchema);
 export default ProductModel; 