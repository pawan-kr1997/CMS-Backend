import { apiError } from "./LogHelper.js";
import { validationResult } from "express-validator";

export const throwError = (req, res, next) => {
  const errorsResult = validationResult.withDefaults({
    formatter: (error) => {
      return {
        value: error.value,
        message: error.msg,
        param: error.param,
        location: error.location,
      };
    },
  });

  const errors = errorsResult(req);

  if (!errors.isEmpty()) {
    return apiError("", res, errors.array(), 422);
  }

  next();
};
