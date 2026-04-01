import { Router } from "express";
import auth from "../middleware/auth.js";
import { createPaymentIntentController, verifyPaymentController } from "../controllers/payment.controller.js";

const paymentRouter = Router();
paymentRouter.post("/create-intent", auth, createPaymentIntentController);
paymentRouter.post("/verify", auth, verifyPaymentController);

export default paymentRouter;
