const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// Find user by ID
const findUserById = async (id) => {
  //is a method used to retrieve a single record from the database that matches certain conditions
  const user = await User.findOne({
    //it specifies conditions that the record must meet.
    where: { id },
    //tells Sequelize which columns to include in the result.
    attributes: ["id"], // only check existence
  });
  return user; // returns null if not found
};

// Create new user
const createNewUser = async (id, name, password) => {
  const user = await User.create({
    id,
    name,
    password,
    isDeleted: false,
  });
  return user;
};

// check for id in login of userRoute
const loginUser = async (id) => {
  const user = await User.findOne({
    where: {
      id,
      isDeleted: false, // block soft-deleted users
    },
    attributes: ["id", "name", "password"],
  });
  return user ? user.toJSON() : null;
};

//delete user account hard delete
const deleteUserAccount = async (id) => {
  const result = await User.destroy({
    where: {
      id,
      isDeleted: false,
    },
  });
  return result;
};

// update username and password
const updateUserDetails = async (id, name, password) => {
  const result = await User.update(
    {
      name,
      password,
    },
    {
      where: {
        id,
        isDeleted: false, //soft deleted user cant update their profile
      },
    }
  );
  return result;
};

//soft delete user account
const softDeleteUserAccount = async (id) => {
  const result = await User.update(
    { isDeleted: true },
    {
      where: {
        id,
        isDeleted: false, // prevent re-deleting
      },
    }
  );
  return result;
};

module.exports = {
  findUserById,
  createNewUser,
  loginUser,
  deleteUserAccount,
  updateUserDetails,
  softDeleteUserAccount,
};
