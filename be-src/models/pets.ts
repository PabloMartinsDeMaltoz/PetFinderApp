import { Sequelize, DataTypes, Model } from "sequelize";
import { sequelize } from "../index";

export class Pets extends Model {}

Pets.init(
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_location_lat: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    last_location_lng: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    
    estados: {
      type: DataTypes.STRING,
    },
    picture:{
      type:DataTypes.STRING
    }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Pets", // We need to choose the model name
  }
);
