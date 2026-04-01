import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  CashOnDeliveryOrderController,
  getAllOrdersController,
  getOrderDetailsController,
  paymentController,
  updateOrderStatusController,
} from "../controllers/order.controller.js";

const orderRouter = Router();
orderRouter.post("/place-cod", auth, CashOnDeliveryOrderController);
orderRouter.post("/place-online", auth, paymentController);
orderRouter.get("/my-orders", auth, getOrderDetailsController);
orderRouter.get("/all", auth, getAllOrdersController);
orderRouter.put("/update-status", auth, updateOrderStatusController);

export default orderRouter;
