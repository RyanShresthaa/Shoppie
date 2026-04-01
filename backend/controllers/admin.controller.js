import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
import CategoryModel from "../models/category.model.js";

export const getDashboardStatsController = async (req, res) => {
  try {
    const [ordersCount, productsCount, categoriesCount, revenueAgg] = await Promise.all([
      OrderModel.countDocuments(),
      ProductModel.countDocuments(),
      CategoryModel.countDocuments(),
      OrderModel.aggregate([{ $group: { _id: null, total: { $sum: "$totalAmt" } } }]),
    ]);
    return res.json({
      data: {
        ordersCount,
        productsCount,
        categoriesCount,
        totalRevenue: revenueAgg?.[0]?.total || 0,
      },
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || error, error: true, success: false });
  }
};
