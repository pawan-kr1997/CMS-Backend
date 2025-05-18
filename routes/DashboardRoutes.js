import express from "express";
import { getVaccinationDetails } from "../controllers/DashboardController.js";

export const dashboardRoutes = express.Router();

dashboardRoutes.get("/dashboard/vaccination", getVaccinationDetails);
