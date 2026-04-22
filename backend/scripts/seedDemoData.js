// Wipes categories / subcategories / products then inserts demo data. Don't run on prod.
import dotenv from "dotenv";
import mongoose from "mongoose";
import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import ProductModel from "../models/product.model.js";
import {
  categoryImageFromName,
  subCategoryImageFromName,
  productImageFromName,
} from "../utils/groceryImageUrls.js";

dotenv.config();

const catalog = [
  {
    category: { name: "Fruits", image: categoryImageFromName("Fruits") },
    subcategories: [
      {
        name: "Apple",
        image: subCategoryImageFromName("Apple"),
        products: [
          ["Royal Gala Apple", 249, "1kg"],
          ["Kashmiri Apple", 279, "1kg"],
          ["Green Apple", 329, "1kg"],
          ["Apple Pack", 149, "500g"],
        ],
      },
      {
        name: "Banana",
        image: subCategoryImageFromName("Banana"),
        products: [
          ["Robusta Banana", 89, "6 pcs"],
          ["Yelakki Banana", 129, "12 pcs"],
          ["Organic Banana", 119, "1 dozen"],
          ["Banana Premium", 79, "500g"],
        ],
      },
      {
        name: "Mango",
        image: subCategoryImageFromName("Mango"),
        products: [
          ["Alphonso Mango", 399, "1kg"],
          ["Kesar Mango", 329, "1kg"],
          ["Badami Mango", 269, "1kg"],
          ["Mango Box", 199, "750g"],
        ],
      },
    ],
  },
  {
    category: { name: "Vegetables", image: categoryImageFromName("Vegetables") },
    subcategories: [
      {
        name: "Leafy Greens",
        image: subCategoryImageFromName("Leafy Greens"),
        products: [
          ["Spinach", 59, "500g"],
          ["Methi Leaves", 49, "250g"],
          ["Coriander", 39, "100g"],
          ["Mint Leaves", 29, "100g"],
        ],
      },
      {
        name: "Root Vegetables",
        image: subCategoryImageFromName("Root Vegetables"),
        products: [
          ["Potato", 35, "1kg"],
          ["Onion", 42, "1kg"],
          ["Carrot", 65, "500g"],
          ["Beetroot", 55, "500g"],
        ],
      },
      {
        name: "Exotic Vegetables",
        image: subCategoryImageFromName("Exotic Vegetables"),
        products: [
          ["Broccoli", 99, "250g"],
          ["Red Bell Pepper", 115, "250g"],
          ["Zucchini", 105, "250g"],
          ["Mushroom Button", 95, "200g"],
        ],
      },
    ],
  },
  {
    category: { name: "Dairy & Eggs", image: categoryImageFromName("Dairy & Eggs") },
    subcategories: [
      {
        name: "Milk",
        image: subCategoryImageFromName("Milk"),
        products: [
          ["Toned Milk", 62, "1L"],
          ["Full Cream Milk", 70, "1L"],
          ["A2 Cow Milk", 95, "1L"],
          ["Double Toned Milk", 58, "1L"],
        ],
      },
      {
        name: "Curd & Yogurt",
        image: subCategoryImageFromName("Curd & Yogurt"),
        products: [
          ["Fresh Curd", 42, "400g"],
          ["Greek Yogurt", 75, "400g"],
          ["Sweet Lassi", 35, "200ml"],
          ["Buttermilk", 20, "200ml"],
        ],
      },
      {
        name: "Eggs",
        image: subCategoryImageFromName("Eggs"),
        products: [
          ["Farm Eggs", 84, "6 pcs"],
          ["Country Eggs", 120, "6 pcs"],
          ["Protein Eggs", 160, "10 pcs"],
          ["White Eggs", 98, "12 pcs"],
        ],
      },
    ],
  },
  {
    category: { name: "Bakery", image: categoryImageFromName("Bakery") },
    subcategories: [
      {
        name: "Bread",
        image: subCategoryImageFromName("Bread"),
        products: [
          ["Whole Wheat Bread", 45, "400g"],
          ["Brown Bread", 42, "400g"],
          ["Multigrain Bread", 58, "400g"],
          ["Sandwich Bread", 40, "400g"],
        ],
      },
      {
        name: "Cakes & Muffins",
        image: subCategoryImageFromName("Cakes & Muffins"),
        products: [
          ["Vanilla Muffin", 35, "2 pcs"],
          ["Chocolate Muffin", 40, "2 pcs"],
          ["Tea Cake", 110, "300g"],
          ["Swiss Roll", 95, "250g"],
        ],
      },
      {
        name: "Cookies",
        image: subCategoryImageFromName("Cookies"),
        products: [
          ["Butter Cookies", 75, "250g"],
          ["Choco Chip Cookies", 95, "250g"],
          ["Oat Cookies", 85, "250g"],
          ["Jeera Cookies", 70, "250g"],
        ],
      },
    ],
  },
  {
    category: { name: "Snacks", image: categoryImageFromName("Snacks") },
    subcategories: [
      {
        name: "Chips",
        image: subCategoryImageFromName("Chips"),
        products: [
          ["Classic Salted Chips", 25, "50g"],
          ["Cream & Onion Chips", 25, "50g"],
          ["Masala Chips", 30, "52g"],
          ["Kettle Chips", 45, "70g"],
        ],
      },
      {
        name: "Namkeen",
        image: subCategoryImageFromName("Namkeen"),
        products: [
          ["Aloo Bhujia", 55, "200g"],
          ["Navratan Mix", 60, "200g"],
          ["Moong Dal Namkeen", 65, "200g"],
          ["Chivda Mix", 58, "200g"],
        ],
      },
      {
        name: "Chocolate",
        image: subCategoryImageFromName("Chocolate"),
        products: [
          ["Milk Chocolate Bar", 40, "50g"],
          ["Dark Chocolate", 90, "80g"],
          ["Hazelnut Chocolate", 120, "90g"],
          ["Wafer Chocolate", 35, "45g"],
        ],
      },
    ],
  },
  {
    category: { name: "Beverages", image: categoryImageFromName("Beverages") },
    subcategories: [
      {
        name: "Juice",
        image: subCategoryImageFromName("Juice"),
        products: [
          ["Orange Juice", 120, "1L"],
          ["Mixed Fruit Juice", 130, "1L"],
          ["Apple Juice", 135, "1L"],
          ["Mango Drink", 95, "1L"],
        ],
      },
      {
        name: "Soft Drinks",
        image: subCategoryImageFromName("Soft Drinks"),
        products: [
          ["Cola Drink", 40, "750ml"],
          ["Lemon Drink", 40, "750ml"],
          ["Orange Soda", 35, "600ml"],
          ["Diet Cola", 45, "750ml"],
        ],
      },
      {
        name: "Tea & Coffee",
        image: subCategoryImageFromName("Tea & Coffee"),
        products: [
          ["CTC Tea", 170, "500g"],
          ["Green Tea", 220, "100g"],
          ["Instant Coffee", 360, "200g"],
          ["Filter Coffee", 295, "200g"],
        ],
      },
    ],
  },
  {
    category: { name: "Rice & Atta", image: categoryImageFromName("Rice & Atta") },
    subcategories: [
      {
        name: "Rice",
        image: subCategoryImageFromName("Rice"),
        products: [
          ["Basmati Rice", 699, "5kg"],
          ["Sona Masoori Rice", 489, "5kg"],
          ["Brown Rice", 199, "1kg"],
          ["Kolam Rice", 479, "5kg"],
        ],
      },
      {
        name: "Atta",
        image: subCategoryImageFromName("Atta"),
        products: [
          ["Whole Wheat Atta", 299, "5kg"],
          ["Multigrain Atta", 349, "5kg"],
          ["Sharbati Atta", 379, "5kg"],
          ["Maida", 75, "1kg"],
        ],
      },
      {
        name: "Pulses",
        image: subCategoryImageFromName("Pulses"),
        products: [
          ["Toor Dal", 185, "1kg"],
          ["Moong Dal", 169, "1kg"],
          ["Chana Dal", 129, "1kg"],
          ["Masoor Dal", 139, "1kg"],
        ],
      },
    ],
  },
  {
    category: { name: "Personal Care", image: categoryImageFromName("Personal Care") },
    subcategories: [
      {
        name: "Shampoo",
        image: subCategoryImageFromName("Shampoo"),
        products: [
          ["Herbal Shampoo", 229, "340ml"],
          ["Anti Dandruff Shampoo", 289, "340ml"],
          ["Protein Shampoo", 199, "300ml"],
          ["Daily Use Shampoo", 165, "300ml"],
        ],
      },
      {
        name: "Soap",
        image: subCategoryImageFromName("Soap"),
        products: [
          ["Moisturizing Soap", 45, "125g"],
          ["Sandal Soap", 55, "125g"],
          ["Neem Soap", 40, "125g"],
          ["Aloe Soap", 42, "125g"],
        ],
      },
      {
        name: "Toothpaste",
        image: subCategoryImageFromName("Toothpaste"),
        products: [
          ["Whitening Toothpaste", 120, "200g"],
          ["Herbal Toothpaste", 95, "200g"],
          ["Sensitive Toothpaste", 170, "200g"],
          ["Kids Toothpaste", 85, "100g"],
        ],
      },
    ],
  },
  {
    category: { name: "Home Cleaning", image: categoryImageFromName("Home Cleaning") },
    subcategories: [
      {
        name: "Dishwash",
        image: subCategoryImageFromName("Dishwash"),
        products: [
          ["Dishwash Gel", 115, "500ml"],
          ["Dishwash Bar", 30, "250g"],
          ["Lemon Dishwash", 119, "500ml"],
          ["Dishwash Scrub Combo", 79, "1 pack"],
        ],
      },
      {
        name: "Floor Cleaner",
        image: subCategoryImageFromName("Floor Cleaner"),
        products: [
          ["Citrus Floor Cleaner", 190, "1L"],
          ["Lavender Floor Cleaner", 199, "1L"],
          ["Disinfectant Cleaner", 225, "1L"],
          ["Bathroom Cleaner", 169, "500ml"],
        ],
      },
      {
        name: "Laundry",
        image: subCategoryImageFromName("Laundry"),
        products: [
          ["Detergent Powder", 310, "2kg"],
          ["Liquid Detergent", 289, "1L"],
          ["Fabric Conditioner", 225, "860ml"],
          ["Detergent Bars", 60, "3 pcs"],
        ],
      },
    ],
  },
];

const productSeed = [];
for (const section of catalog) {
  for (const sub of section.subcategories) {
    for (const [name, price, unit] of sub.products) {
      productSeed.push({
        name,
        price,
        stock: 200,
        categoryName: section.category.name,
        subCategoryName: sub.name,
        unit,
        discount: Math.floor(Math.random() * 16),
        description: `${name} from ${section.category.name}. Fresh stock with fast delivery.`,
        image: [productImageFromName(name)],
      });
    }
  }
}

const run = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI in .env");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to DB for seeding");

  // Reset catalog to ensure old low-quality images are replaced.
  await ProductModel.deleteMany({});
  await SubCategoryModel.deleteMany({});
  await CategoryModel.deleteMany({});

  const categoryMap = {};
  for (const section of catalog) {
    const category = await CategoryModel.create(section.category);
    categoryMap[section.category.name] = category._id;
  }

  const subCategoryMap = {};
  for (const section of catalog) {
    const categoryId = categoryMap[section.category.name];
    for (const sub of section.subcategories) {
      const subCategory = await SubCategoryModel.create({
        name: sub.name,
        image: sub.image,
        category: [categoryId],
      });
      subCategoryMap[sub.name] = subCategory._id;
    }
  }

  let createdCount = 0;
  for (const item of productSeed) {
    await ProductModel.create({
      name: item.name,
      image: item.image,
      category: [categoryMap[item.categoryName]],
      subcategory: [subCategoryMap[item.subCategoryName]],
      unit: item.unit,
      stock: item.stock,
      price: item.price,
      discount: 0,
      description: item.description,
      more_details: {},
      publish: true,
    });
    createdCount += 1;
  }

  console.log(`Demo data seeded successfully: ${createdCount} products`);
  await mongoose.disconnect();
};

run()
  .then(() => process.exit(0))
  .catch(async (err) => {
    console.error("Seed failed:", err.message);
    await mongoose.disconnect();
    process.exit(1);
  });

