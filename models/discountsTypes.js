const { DataTypes } = require("sequelize");
const sequelize = require("./dbConnection");
const Discounts = require("./discountsModel");

const DiscountsTypes = sequelize.define(
  "DiscountsTypes",
  {
    d_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Discounts,
        key: "d_id",
      },
    },
    d_flat: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    d_percent: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
  },
  {
    tableName: "discountstypes",
    timestamps: false,
  }
);

// Associations
Discounts.hasOne(DiscountsTypes, {
  foreignKey: "d_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

DiscountsTypes.belongsTo(Discounts, {
  foreignKey: "d_id",
});

module.exports = DiscountsTypes;
