import express from "express";
import { getForms } from "../controllers/FormController.js";

export const formRoutes = express.Router();

formRoutes.get("/forms", getForms);
