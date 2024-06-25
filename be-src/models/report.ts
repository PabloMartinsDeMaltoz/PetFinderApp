import { Sequelize, DataTypes, Model } from "sequelize";
import { sequelize } from "../index";

export class Report extends Model {}

Report.init(
  {
    // Model attributes are defined here
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    message: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Report", // We need to choose the model name
  }
);
