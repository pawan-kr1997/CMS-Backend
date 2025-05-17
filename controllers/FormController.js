import { v4 as uuidv4 } from "uuid";
import FormDetail from "../models/FormDetail.js";
import { api } from "../helpers/LogHelper.js";

export const getForms = async (req, res) => {
  let query = {};

  if (req.query.s) {
    query = {
      where: {
        [Op.or]: [
          literal(`CONCAT(first_name, ' ', last_name) ILIKE '${searchTerm}'`),
          { family_id: { [Op.like]: `%${req.query.s}%` } },
        ],
      },
    };
  }

  if (req.query.cohort) {
    query.cohort = req.query.cohort;
  }

  const formDetails = await FormDetail.findAll({ where: query });

  return api("", res, formDetails);
};

export const getFormCount = async (req, res) => {
  const formDetails = await FormDetail.findAll();

  return api("", res, { submitted_form_count: formDetails.length });
};

export const getSingleForm = async (req, res) => {
  const formDetail = await FormDetail.findOne({
    where: { uuid: req.params.uuid },
  });

  if (!formDetail) {
    throw { message: "Form not found", code: 422 };
  }

  return api("", res, formDetail);
};

export const postForm = async (req, res) => {
  const data = {
    uuid: uuidv4(),
    family_id: req.body.familyId,
    cohort: req.body.cohort,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    dob: req.body.dob,
    age: req.body.age,
    gender: req.body.gender,
    state: req.body.state,
    vaccination_status: req.body.vaccinationStatus,
    height: req.body.height,
    weight: Number(req.body.weightKg) * 1000 + Number(req.body.weightGrams),
    bmi: req.body.bmi,
    nutrition_status: req.body.nutritionStatus,
    enrolled_feeding_program: req.body.enrolledFeedingProgram,
  };

  await FormDetail.create(data);

  return api("Form created successfully", res, {});
};
