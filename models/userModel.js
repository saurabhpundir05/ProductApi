const { DataTypes } = require("sequelize");
const sequelize = require("./dbConnection");

// used to define a model, which represents a table in db
// variable that holds the model object
const User = sequelize.define(
  //model name
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    // Tells Sequelize not to create createdAt and updatedAt columns by default it makes
    timestamps: false,
  }
);

module.exports = User;
