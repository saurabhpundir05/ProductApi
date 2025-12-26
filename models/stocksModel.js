const { DataTypes } = require("sequelize");
const sequelize = require("./dbConnection");
const Product = require("./productModel");

const Stock = sequelize.define(
  "Stock",
  {
    s_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    p_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // each product has only one stock record
      //create a foreign key relationship between tables
      references: {
        model: Product,
        key: "p_id",
      },
      //if the parent record is deleted, all related child records are automatically deleted.
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "stocks",
    timestamps: false,
  }
);

// Set association both req in both direction
// one to one
Product.hasOne(Stock, {
  foreignKey: "p_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
// each Stock record belongs to a Product && tells Sequelize that Stock is the child in this relationship.
Stock.belongsTo(Product, { foreignKey: "p_id" });

module.exports = Stock;
