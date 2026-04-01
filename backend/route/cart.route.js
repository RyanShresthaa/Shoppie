import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  addToCartController,
  getCartController,
  removeCartController,
  updateCartController,
} from "../controllers/cart.controller.js";

const cartRouter = Router();
cartRouter.post("/add", auth, addToCartController);
cartRouter.get("/get", auth, getCartController);
cartRouter.put("/update", auth, updateCartController);
cartRouter.delete("/delete", auth, removeCartController);

export default cartRouter;
