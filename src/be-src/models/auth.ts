import { DataTypes, Model } from "sequelize";
import { sequelize } from "../index";

export class Auth extends Model {}

Auth.init(
  {
    // Model attributes are defined here
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Auth", // We need to choose the model name
  }
);
