import FormDetail from "../models/FormDetail.js";

export const getForms = async (req, res) => {
  const formDetails = await FormDetail.findAll();

  res.json(formDetails);
  return;
};

export const postForm = async (req, res) => {
  const formDetails = await FormDetail.findAll();

  res.json(formDetails);
  return;
};

export const editForm = async (req, res) => {
  const formDetails = await FormDetail.findAll();

  res.json(formDetails);
  return;
};

export const deleteForm = async (req, res) => {
  const formDetails = await FormDetail.findAll();

  res.json(formDetails);
  return;
};
