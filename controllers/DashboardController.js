import FormDetail from "../models/FormDetail.js";
import { api } from "../helpers/LogHelper.js";
import _ from "lodash";
import { Op } from "sequelize";

export const getVaccinationDetails = async (req, res) => {
  let query = {};

  if (req.query.state) {
    query.state = req.query.state;
  }

  if (req.query.cohort) {
    query.cohort = req.query.cohort;
  }

  if (req.query.gender) {
    query.gender = req.query.gender;
  }

  const formDetails = await FormDetail.findAll({ where: query });

  const ageGroups = [
    { label: "0-2", min: 0, max: 2 },
    { label: "2-4", min: 2, max: 4 },
    { label: "4-6", min: 4, max: 6 },
    { label: "6-8", min: 6, max: 8 },
    { label: "8-10", min: 8, max: 10 },
  ];

  // group data based on age group
  const getAgeGroup = (age) => {
    const group = ageGroups.find(({ min, max }) =>
      max === 10 ? age >= min && age <= max : age >= min && age < max
    );
    return group ? group.label : "unknown";
  };

  const groupedData = _.groupBy(formDetails, (detail) =>
    getAgeGroup(detail.age)
  );

  // extract data based on vaccination status
  const result = Object.entries(groupedData).map(([ageGroup, entries]) => {
    return {
      name: ageGroup,
      fully: entries.filter((e) => e.vaccination_status === "fully").length,
      partially: entries.filter((e) => e.vaccination_status === "partially")
        .length,
      none: entries.filter((e) => e.vaccination_status === "none").length,
    };
  });

  //order the data based on age group
  let orderedResult = ageGroups.map(
    ({ label }) =>
      result.find((r) => r.name === label) || {
        name: label,
        fully: 0,
        partially: 0,
        none: 0,
      }
  );

  return api("", res, orderedResult);
};

export const getHeightDetails = async (req, res) => {
  let query = {};

  if (req.query.state) {
    query.state = req.query.state;
  }

  if (req.query.cohorts) {
    query.cohort = { [Op.in]: req.query.cohorts };
  }

  if (req.query.gender) {
    query.gender = req.query.gender;
  }

  if (req.query.enrolled) {
    query.enrolled_feeding_program = req.query.enrolled;
  }

  const formDetails = await FormDetail.findAll({ where: query });

  const ageGroups = [
    { label: "0-2", min: 0, max: 2, normal: [50, 90] },
    { label: "2-4", min: 2, max: 4, normal: [85, 105] },
    { label: "4-6", min: 4, max: 6, normal: [100, 115] },
    { label: "6-8", min: 6, max: 8, normal: [110, 125] },
    { label: "8-10", min: 8, max: 10, normal: [120, 140] },
  ];

  const ageGroupsObj = _.keyBy(ageGroups, "label");

  // group data based on age group
  const getAgeGroup = (age) => {
    const group = ageGroups.find(({ min, max }) =>
      max === 10 ? age >= min && age <= max : age >= min && age < max
    );
    return group ? group.label : "unknown";
  };

  const groupedData = _.groupBy(formDetails, (detail) =>
    getAgeGroup(detail.age)
  );

  // extract data based on vaccination status
  const result = Object.entries(groupedData).map(([ageGroup, entries]) => {
    return {
      name: ageGroup,
      normal: ageGroupsObj[ageGroup].normal,
      ["2022-23"]: Math.ceil(
        _.meanBy(
          entries.filter((e) => e.cohort === "2022-23"),
          "height"
        ) || 0
      ),
      ["2023-24"]: Math.ceil(
        _.meanBy(
          entries.filter((e) => e.cohort === "2023-24"),
          "height"
        ) || 0
      ),
      ["2024-25"]: Math.ceil(
        _.meanBy(
          entries.filter((e) => e.cohort === "2024-25"),
          "height"
        ) || 0
      ),
    };
  });

  //order the data based on age group
  let orderedResult = ageGroups.map(
    ({ label }) =>
      result.find((r) => r.name === label) || {
        name: label,
        fully: 0,
        partially: 0,
        none: 0,
      }
  );

  return api("", res, orderedResult);
};

export const getWeightDetails = async (req, res) => {
  let query = {};

  if (req.query.state) {
    query.state = req.query.state;
  }

  if (req.query.cohorts) {
    query.cohort = { [Op.in]: req.query.cohorts };
  }

  if (req.query.gender) {
    query.gender = req.query.gender;
  }

  if (req.query.enrolled) {
    query.enrolled_feeding_program = req.query.enrolled;
  }

  const formDetails = await FormDetail.findAll({ where: query });

  const ageGroups = [
    { label: "0-2", min: 0, max: 2, normal: [800, 1300] },
    { label: "2-4", min: 2, max: 4, normal: [12000, 18000] },
    { label: "4-6", min: 4, max: 6, normal: [16000, 22000] },
    { label: "6-8", min: 6, max: 8, normal: [20000, 28000] },
    { label: "8-10", min: 8, max: 10, normal: [25000, 38000] },
  ];

  const ageGroupsObj = _.keyBy(ageGroups, "label");

  // group data based on age group
  const getAgeGroup = (age) => {
    const group = ageGroups.find(({ min, max }) =>
      max === 10 ? age >= min && age <= max : age >= min && age < max
    );
    return group ? group.label : "unknown";
  };

  const groupedData = _.groupBy(formDetails, (detail) =>
    getAgeGroup(detail.age)
  );

  // extract data based on vaccination status
  const result = Object.entries(groupedData).map(([ageGroup, entries]) => {
    return {
      name: ageGroup,
      normal: ageGroupsObj[ageGroup].normal,
      ["2022-23"]: Math.ceil(
        _.meanBy(
          entries.filter((e) => e.cohort === "2022-23"),
          "weight"
        ) || 0
      ),
      ["2023-24"]: Math.ceil(
        _.meanBy(
          entries.filter((e) => e.cohort === "2023-24"),
          "weight"
        ) || 0
      ),
      ["2024-25"]: Math.ceil(
        _.meanBy(
          entries.filter((e) => e.cohort === "2024-25"),
          "weight"
        ) || 0
      ),
    };
  });

  //order the data based on age group
  let orderedResult = ageGroups.map(
    ({ label }) =>
      result.find((r) => r.name === label) || {
        name: label,
        fully: 0,
        partially: 0,
        none: 0,
      }
  );

  return api("", res, orderedResult);
};
