const express = require("express");
const checkAuthUsingJwt = require("../middleware/checkAuth");
const router = express.Router(); //router instance
const categoryService = require("../services/categoryDbQueries");
const { addDTO, deleteDTO } = require("../dtos/category.dto");

//add new category
router.post("/addCategory", checkAuthUsingJwt, async (req, res) => {
  try {
    const categoryData = new addDTO(req.body);
    categoryData.validate();
    await categoryService.insertNewCategories(categoryData.name);
    return res.status(201).json({ message: "Category inserted" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

//delete category
router.delete("/deleteCategory", checkAuthUsingJwt, async (req, res) => {
  try {
    const categoryData = new deleteDTO(req.body);
    categoryData.validate();
    await categoryService.deletecategories(categoryData.id);
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
