const { DataTypes } = require("sequelize");
const sequelize = require("./dbConnection");
const Categories = require("./categoriesModel");

const Product = sequelize.define(
  "Product",
  {
    p_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    p_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    c_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Categories,
        key: "c_id",
      },
    },
  },
  {
    tableName: "products",
    timestamps: false,
  }
);

// Associations
Categories.hasMany(Product, {
  foreignKey: "c_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Product.belongsTo(Categories, {
  foreignKey: "c_id",
});
module.exports = Product;
