import dotenv from "dotenv";
import mongoose from "mongoose";
import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import ProductModel from "../models/product.model.js";
import {
  productImageFromName,
  categoryImageFromName,
  subCategoryImageFromName,
} from "../utils/groceryImageUrls.js";

dotenv.config();

const hasValidImage = (value) => {
  if (Array.isArray(value)) {
    return Boolean(value[0]);
  }
  return Boolean(value);
};

const run = async () => {
  const force = process.argv.includes("--force");
  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI in .env");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("connected, patching images...");

  let updatedProducts = 0;
  let updatedCategories = 0;
  let updatedSubCategories = 0;

  const products = await ProductModel.find({});
  for (const product of products) {
    if (force || !hasValidImage(product.image)) {
      product.image = [productImageFromName(product.name)];
      await product.save();
      updatedProducts += 1;
    }
  }

  const categories = await CategoryModel.find({});
  for (const category of categories) {
    if (force || !hasValidImage(category.image)) {
      category.image = categoryImageFromName(category.name);
      await category.save();
      updatedCategories += 1;
    }
  }

  const subCategories = await SubCategoryModel.find({});
  for (const subCategory of subCategories) {
    if (force || !hasValidImage(subCategory.image)) {
      subCategory.image = subCategoryImageFromName(subCategory.name);
      await subCategory.save();
      updatedSubCategories += 1;
    }
  }

  console.log(
    `done — products ${updatedProducts}, categories ${updatedCategories}, subcats ${updatedSubCategories}`
  );

  await mongoose.disconnect();
};

run()
  .then(() => process.exit(0))
  .catch(async (err) => {
    console.error("backfill blew up:", err.message);
    await mongoose.disconnect();
    process.exit(1);
  });
