const express = require("express");
const checkAuthUsingJwt = require("../middleware/checkAuth");
const router = express.Router(); //router instance
const generateToken = require("../helpers/jwtToken");
const userService = require("../services/productDbQueries");
const {
  addDTO,
  ProductResponseDTO,
  updateDTO,
  deleteDTO,
  addToCartDTO,
} = require("../dtos/product.dto");

//Get all product details
router.get("/getAllProductDetails", checkAuthUsingJwt, async (req, res) => {
  try {
    //searching and storing all product details in msql
    const products = await userService.getAllProductDetails();
    //mapping to product details in dto && to convert internal data models into structured response objects for APIs
    const productDTOs = products.map((p) => new ProductResponseDTO(p));
    return res.status(200).json(productDTOs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Database error" });
  }
});

// //insert new products to product table
router.post("/addNewProduct", checkAuthUsingJwt, async (req, res) => {
  try {
    const inputData = new addDTO(req.body);
    inputData.validate();
    await userService.addNewProduct(
      inputData.name,
      inputData.price,
      inputData.c_id
    );
    return res.status(201).json({
      message: "Product added successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
});

// update product details
router.patch("/updateProductDetails", checkAuthUsingJwt, async (req, res) => {
  try {
    const inputData = new updateDTO(req.body);
    inputData.validate();
    const result = await userService.updateProduct(
      inputData.p_id,
      inputData.name,
      inputData.price,
      inputData.c_id
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({
      message: "Product updated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
});

//delete product details
router.delete("/deleteProductDetails", checkAuthUsingJwt, async (req, res) => {
  try {
    const inputData = new deleteDTO(req.body);
    inputData.validate();
    const result = await userService.deleteproductDetails(inputData.p_id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
});

//add to cart
router.post("/addToCart", checkAuthUsingJwt, async (req, res) => {
  try {
    const inputData = new addToCartDTO(req.body);
    inputData.validate();
    // Expect input as object { productName: quantity }
    const productMap = inputData.p_name;
    //Checks if productMap is NOT an object type.
    // This catches primitives like strings, numbers, booleans, undefined, etc.
    //Checks if productMap IS an array. This is necessary because in JavaScript,
    // typeof [] returns "object", so arrays would pass the first check.
    if (typeof productMap !== "object" || Array.isArray(productMap)) {
      return res.status(400).json({ message: "Invalid input format" });
    }
    const result = await userService.addToCartProduct(productMap);
    if (result.length === 0) {
      return res
        .status(400)
        .json({ message: "No products added (not found or out of stock)" });
    }
    return res.status(200).json({
      message: "Products added to cart",
      products: result,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
