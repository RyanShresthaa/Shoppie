import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
    name : {
        type : String,
        default : "",
        trim: true,
        required: [true, "Subcategory name is required"],
    },
    image : {
        type: String,
        default : "",
        required: [true, "Subcategory image is required"],
    },
    category : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "category",
            required: [true, 'Category ID is required'],
}]}, 
    {timestamps: true},
)

const SubCategoryModel = mongoose.model('subcategory', subcategorySchema);
export default SubCategoryModel;