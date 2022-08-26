const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//Define our Image mode
class Image extends Model {}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true,
      },
    },
  },
  // Second passing object
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "image",
  }
);
module.exports = Image;
