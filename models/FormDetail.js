import { Model, DataTypes } from "sequelize";
import { sequelize } from "../helpers/DatabaseHelper.js";

class FormDetail extends Model {}

FormDetail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },

    family_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    cohort: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    vaccination_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    height: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    bmi: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    nutrition_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    enrolled_feeding_program: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },

  {
    sequelize,
    tableName: "FormDetails",
    paranoid: true,
  }
);

export default FormDetail;
