import express from "express";
import {
  getFormCount,
  getForms,
  getSingleForm,
  postForm,
} from "../controllers/FormController.js";
import { Validate } from "../validations/FormValidation.js";
import { throwError } from "../helpers/ValidationHelper.js";

export const formRoutes = express.Router();

formRoutes.post("/form", Validate("postForm"), throwError, postForm);
formRoutes.get("/forms", Validate("getForms"), throwError, getForms);
formRoutes.get("/forms/count", getFormCount);
formRoutes.get("/form/:uuid", Validate("getForm"), throwError, getSingleForm);
