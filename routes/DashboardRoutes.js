import express from "express";
import {
  getHeightDetails,
  getVaccinationDetails,
  getWeightDetails,
} from "../controllers/DashboardController.js";

export const dashboardRoutes = express.Router();

dashboardRoutes.get("/dashboard/vaccination", getVaccinationDetails);
dashboardRoutes.get("/dashboard/height", getHeightDetails);
dashboardRoutes.get("/dashboard/weight", getWeightDetails);
