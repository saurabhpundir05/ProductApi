const express = require("express");
const checkAuthUsingJwt = require("../middleware/checkAuth");
const router = express.Router(); //router instance
const generateToken = require("../helpers/jwtToken");
const userService = require("../services/userDbQueries");
const { SignupDTO, LoginDTO } = require("../dtos/user.dto");
const bcrypt = require("bcrypt");

//Signup route
router.post("/signup", async (req, res) => {
  try {
    const signupData = new SignupDTO(req.body);
    signupData.validate();
    // Check if user already exists
    const existingUser = await userService.findUserById(signupData.id);
    if (existingUser) {
      return res.status(409).json({ message: "User id already exists" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(signupData.password, 10);
    // Create user
    await userService.createNewUser(
      signupData.id,
      signupData.name,
      hashedPassword
    );
    return res.status(201).json({
      message: "User created successfully, now Log In",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
});

//Login route
router.post("/login", async (req, res) => {
  try {
    const loginData = new LoginDTO(req.body);
    loginData.validate();
    const user = await userService.loginUser(loginData.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordMatch = await bcrypt.compare(
      loginData.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user.id, user.name);
    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// delete user account
router.delete("/deleteUserId", checkAuthUsingJwt, async (req, res) => {
  try {
    const inputData = new LoginDTO(req.body);
    inputData.validate();
    const result = await userService.deleteUserAccount(inputData.id);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "User not found / Is hard deleted" });
    }
    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
});

//soft delete user account
router.delete("/softDeleteUser", checkAuthUsingJwt, async (req, res) => {
  try {
    const inputData = new LoginDTO(req.body);
    inputData.validate();
    const result = await userService.softDeleteUserAccount(inputData.id);
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User soft deleted" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
});

//update password and name
router.patch("/updateUserPassword", checkAuthUsingJwt, async (req, res) => {
  try {
    const inputData = new SignupDTO(req.body);
    inputData.validate();
    const hashedPassword = await bcrypt.hash(inputData.password, 10);
    const result = await userService.updateUserDetails(
      inputData.id,
      inputData.name,
      hashedPassword
    );
    if (result[0] === 0) {
      return res.status(404).json({ message: "User not found or deleted" });
    }
    return res.status(200).json({
      message: "User password updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
