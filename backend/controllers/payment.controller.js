import OrderModel from "../models/order.model.js";

export const createPaymentIntentController = async (req, res) => {
  try {
    const paymentId = `PAY-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const { amount = 0 } = req.body || {};
    return res.json({
      message: "Payment intent created",
      data: { paymentId, amount, provider: "mock" },
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || error, error: true, success: false });
  }
};

export const verifyPaymentController = async (req, res) => {
  try {
    const { orderIds = [], paymentId } = req.body || {};
    await OrderModel.updateMany(
      { _id: { $in: orderIds } },
      { paymentId: paymentId || "", payment_status: "paid" }
    );
    return res.json({ message: "Payment verified", error: false, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message || error, error: true, success: false });
  }
};
