const { DataTypes } = require("sequelize");
const sequelize = require("./dbConnection");
const Product = require("./productModel");

const Discounts = sequelize.define(
  "Discounts",
  {
    d_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    p_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: Product,
        key: "p_id",
      },
    },
    d_type: {
      type: DataTypes.ENUM("FLAT", "PERCENT"),
      allowNull: false,
    },
  },
  {
    tableName: "discounts",
    timestamps: false,
  }
);

// Associations
Product.hasOne(Discounts, {
  foreignKey: "p_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Discounts.belongsTo(Product, {
  foreignKey: "p_id",
});

module.exports = Discounts;
