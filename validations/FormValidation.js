import { body, param } from "express-validator";

export const Validate = (reqType) => {
  switch (reqType) {
    case "postForm": {
      return [
        body("familyId").notEmpty().withMessage("Please provide familyID"),

        body("cohort")
          .notEmpty()
          .withMessage("Please provide cohort")
          .bail()
          .isIn(["2022-23", "2023-24", "2024-25"])
          .withMessage("Please provide valid cohort"),

        body("firstName").notEmpty().withMessage("Please provide first name"),

        body("lastName").notEmpty().withMessage("Please provide last name"),

        body("dob").notEmpty().withMessage("Please provide date of birth"),

        body("age")
          .notEmpty()
          .withMessage("Please provide age")
          .bail()
          .isNumeric({ min: 0, max: 10 })
          .withMessage("User do not belong the age range of 0-10"),

        body("gender")
          .notEmpty()
          .withMessage("Please provide gender")
          .bail()
          .isIn(["male", "female", "other"])
          .withMessage("Please provide valid gender"),

        body("state")
          .notEmpty()
          .withMessage("Please provide state")
          .bail()
          .isIn(["uttar pradesh", "madhya pradesh", "karnataka"])
          .withMessage("Please provide valid state"),

        body("vaccinationStatus")
          .notEmpty()
          .withMessage("Please provide vaccination status")
          .bail()
          .isIn(["fully", "partially", "none"])
          .withMessage("Please provide valid vaccination status"),

        body("nutritionStatus")
          .notEmpty()
          .withMessage("Please provide nutrition status")
          .bail()
          .isIn(["good", "moderate", "poor"])
          .withMessage("Please provide valid vaccination status"),

        body("height")
          .notEmpty()
          .withMessage("Please provide height")
          .bail()
          .isFloat({ min: 0 })
          .withMessage("Please provide valid height"),

        body("weightKg")
          .notEmpty()
          .withMessage("Please provide weight in kg")
          .bail()
          .isNumeric({ min: 0 })
          .withMessage("Please provide valid weight in kg"),

        body("weightGrams")
          .notEmpty()
          .withMessage("Please provide weight in grams")
          .bail()
          .isNumeric({ min: 0 })
          .withMessage("Please provide valid weight in grams"),

        body("bmi")
          .notEmpty()
          .withMessage("Please provide BMI")
          .bail()
          .isFloat({ min: 0 })
          .withMessage("Please provide valid BMI"),

        body("enrolledFeedingProgram")
          .notEmpty()
          .withMessage("Please provide enrolled feeding program")
          .bail()
          .isBoolean()
          .withMessage("Please provide valid enrolled feeding program"),
      ];
    }

    case "postFormBulk": {
      return [
        body("forms")
          .notEmpty()
          .withMessage("Please provide form data")
          .bail()
          .isArray({ min: 1 })
          .withMessage("Please provide atleast one form data"),
      ];
    }

    case "getForms": {
      return [
        body("cohort")
          .optional()
          .notEmpty()
          .withMessage("Please provide cohort")
          .bail()
          .isIn(["2022-23", "2023-24", "2024-25"])
          .withMessage("Please provide valid cohort"),
      ];
    }

    case "getForm": {
      return [
        param("uuid")
          .notEmpty()
          .withMessage("Please provide uuid")
          .bail()
          .isUUID()
          .withMessage("Please provide valid uuid"),
      ];
    }
  }
};
