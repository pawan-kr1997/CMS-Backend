import FormDetail from "../models/FormDetail.js";
import { api } from "../helpers/LogHelper.js";
import _ from "lodash";

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
