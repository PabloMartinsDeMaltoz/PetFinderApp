import { DataTypes, Model } from "sequelize";
import { sequelize } from "../index";

export class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel: {
      type: DataTypes.INTEGER,
    },

    authid: {
      type: DataTypes.INTEGER,
    },
    city: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "User", // We need to choose the model name
  }
);
