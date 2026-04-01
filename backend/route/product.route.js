import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  createProductController,
  deleteProductDetails,
  getProductByCategory,
  getProductByCategoryAndSubCategory,
  getProductByIdController,
  getProductController,
  getProductDetails,
  updateProductDetails,
} from "../controllers/product.controller.js";

const productRouter = Router();

// Create
productRouter.post("/add-product", auth, createProductController);
productRouter.post("/create", auth, createProductController);

// Read/list/search
productRouter.get("/get-product", getProductController);
productRouter.post("/get", getProductController);
productRouter.post("/search-product", getProductController);
productRouter.get("/get-product/:id", getProductByIdController);
productRouter.post("/get-product-details", getProductDetails);
productRouter.post("/get-product-by-category", getProductByCategory);
productRouter.post(
  "/get-pruduct-by-category-and-subcategory",
  getProductByCategoryAndSubCategory
);

// Update/delete
productRouter.put("/update-product", auth, updateProductDetails);
productRouter.put("/update-product-details", auth, updateProductDetails);
productRouter.delete("/delete-product", auth, deleteProductDetails);

export default productRouter;
