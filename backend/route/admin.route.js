import { Router } from "express";
import auth from "../middleware/auth.js";
import { getDashboardStatsController } from "../controllers/admin.controller.js";

const adminRouter = Router();
adminRouter.get("/stats", auth, getDashboardStatsController);

export default adminRouter;
