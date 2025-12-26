const { DataTypes } = require("sequelize");
const sequelize = require("./dbConnection");

const Product = sequelize.define(
  "Product",
  {
    p_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    p_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    c_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "products",
    timestamps: false,
  }
);

module.exports = Product;
