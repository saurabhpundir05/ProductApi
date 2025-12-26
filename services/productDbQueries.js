const Product = require("../models/productModel");
const Stock = require("../models/stocksModel");
const sequelize = require("../models/dbConnection");

// get all product details
const getAllProductDetails = async () => {
  const products = await Product.findAll();
  return products.map((p) => p.toJSON());
};

//Add new product
const addNewProduct = async (name, price, c_id = null) => {
  // to start a new database transaction.
  const t = await sequelize.transaction();
  try {
    // Insert new product
    const product = await Product.create(
      { p_name: name, price, c_id },
      { transaction: t }
    );
    // Insert or update stock
    const [stock, created] = await Stock.findOrCreate({
      where: { p_id: product.p_id },
      defaults: { quantity: 1 },
      transaction: t,
    });
    if (!created) {
      // Product already exists in stock increment quantity
      stock.quantity += 1;
      await stock.save({ transaction: t });
    }
    // Commit transaction
    await t.commit();
    return { product_id: product.p_id };
  } catch (err) {
    // Rollback on error
    await t.rollback();
    throw err;
  }
};

//update product details
const updateProduct = async (p_id, p_name, price, c_id = null) => {
  // Start a transaction
  const t = await sequelize.transaction();
  try {
    // Update the product
    const [updatedRows] = await Product.update(
      { p_name, price, c_id },
      { where: { p_id }, transaction: t }
    );
    if (updatedRows === 0) {
      // No product found to update
      await t.rollback();
      return null;
    }
    await t.commit();
    return { message: "Product updated successfully", p_id };
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

//delete product details
const deleteproductDetails = async (p_id) => {
  // Start transaction
  const t = await sequelize.transaction();
  try {
    // Find stock for the product
    const stock = await Stock.findOne({ where: { p_id }, transaction: t });
    if (stock) {
      // Decrease quantity by 1
      stock.quantity = Math.max(stock.quantity - 1, 0); // prevent negative
      await stock.save({ transaction: t });
    }
    // Delete product
    const deletedRows = await Product.destroy({
      where: { p_id },
      transaction: t,
    });
    if (deletedRows === 0) {
      await t.rollback();
      return null; // Product not found
    }
    await t.commit();
    return { message: "Product deleted successfully", p_id };
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

module.exports = {
  getAllProductDetails,
  addNewProduct,
  updateProduct,
  deleteproductDetails,
};
