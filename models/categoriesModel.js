const { DataTypes } = require("sequelize");
const sequelize = require("./dbConnection");

const Categories = sequelize.define(
  //model name
  "Categories",
  {
    c_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    c_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "categories",
    timestamps: false,
  }
);
module.exports = Categories;
