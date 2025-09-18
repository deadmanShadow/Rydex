import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { StatsController } from "./stats.controller";

const router = express.Router();

router.get("/public", StatsController.getPublicHomepageStats);

router.get(
  "/dashboard",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  StatsController.getDashboardStats
);

router.get(
  "/rides",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  StatsController.getRideStats
);

router.get(
  "/users",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  StatsController.getUserStats
);

router.get(
  "/drivers",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  StatsController.getDriverStats
);

router.get(
  "/revenue",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  StatsController.getRevenueStats
);

export const StatsRoutes = router;
