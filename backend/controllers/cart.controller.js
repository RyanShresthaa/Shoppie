import CartProductModel from "../models/cartproduct.model.js";
import ProductModel from "../models/product.model.js";

export const addToCartController = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity = 1 } = req.body || {};
    if (!productId) {
      return res.status(400).json({ message: "productId is required", error: true, success: false });
    }
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found", error: true, success: false });
    }
    const existing = await CartProductModel.findOne({ userId, productId });
    if (existing) {
      existing.quantity += Number(quantity || 1);
      await existing.save();
      return res.json({ message: "Cart updated", data: existing, error: false, success: true });
    }
    const created = await CartProductModel.create({ userId, productId, quantity });
    return res.json({ message: "Added to cart", data: created, error: false, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message || error, error: true, success: false });
  }
};

export const getCartController = async (req, res) => {
  try {
    const data = await CartProductModel.find({ userId: req.userId }).populate("productId");
    return res.json({ data, error: false, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message || error, error: true, success: false });
  }
};

export const updateCartController = async (req, res) => {
  try {
    const { _id, quantity } = req.body || {};
    if (!_id) {
      return res.status(400).json({ message: "cart id is required", error: true, success: false });
    }
    const updated = await CartProductModel.findByIdAndUpdate(
      _id,
      { quantity: Math.max(1, Number(quantity || 1)) },
      { new: true }
    );
    return res.json({ message: "Cart quantity updated", data: updated, error: false, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message || error, error: true, success: false });
  }
};

export const removeCartController = async (req, res) => {
  try {
    const { _id } = req.body || {};
    await CartProductModel.deleteOne({ _id, userId: req.userId });
    return res.json({ message: "Removed from cart", error: false, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message || error, error: true, success: false });
  }
};
