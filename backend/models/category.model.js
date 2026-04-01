import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        default : "",
        trim: true,
        required: [true, "Category name is required"],
    },
    image : {
        type: String,
        default : "",
        required: [true, "Category image is required"],
    },
}, {timestamps: true

})

const categoryModel = mongoose.model('category',categorySchema)
export default categoryModel