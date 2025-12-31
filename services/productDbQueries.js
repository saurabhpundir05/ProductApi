const Product = require("../models/productModel");
const Stock = require("../models/stocksModel");
const Cart = require("../models/cartModel");
const sequelize = require("../models/dbConnection");

// get all product details
const getAllProductDetails = async () => {
  const products = await Product.findAll();
  return products.map((p) => p.toJSON());
};

//Add new product
const addNewProduct = async (name, price, c_id = null) => {
  const t = await sequelize.transaction();
  try {
    // Check if the product already exists
    let product = await Product.findOne({
      where: { p_name: name },
      transaction: t,
    });
    if (!product) {
      // Product doesn't exist, create it
      product = await Product.create(
        { p_name: name, price, c_id },
        { transaction: t }
      );
      // Create stock entry with quantity 1
      await Stock.create(
        { p_id: product.p_id, quantity: 1 },
        { transaction: t }
      );
    } else {
      // Product exists, increase stock quantity
      const stock = await Stock.findOne({
        where: { p_id: product.p_id },
        transaction: t,
      });
      if (stock) {
        stock.quantity += 1;
        await stock.save({ transaction: t });
      } else {
        // If stock entry doesn't exist for some reason, create it
        await Stock.create(
          { p_id: product.p_id, quantity: 1 },
          { transaction: t }
        );
      }
    }
    await t.commit();
    return { product_id: product.p_id };
  } catch (err) {
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

//add to cart
const addToCartProduct = async (productMap) => {
  const t = await sequelize.transaction();
  try {
    const addedProducts = [];
    //Object.entries(productMap) - Converts the object into an array of [key, value]
    //Array destructuring [p_name, quantity]
    for (const [p_name, quantity] of Object.entries(productMap)) {
      const product = await Product.findOne({
        where: { p_name },
        transaction: t,
      });
      if (!product) continue;
      const stock = await Stock.findOne({
        where: { p_id: product.p_id },
        transaction: t,
        //Applies a pessimistic lock on the selected row
        //Uses FOR UPDATE in SQL, preventing other transactions
        //from modifying this row until the current transaction completes
        lock: t.LOCK.UPDATE,
      });
      if (!stock || stock.quantity <= 0) {
        //Skips the rest of the current loop iteration Moves to the next item in the loop
        continue;
      }
      // Determine how many units can actually be added quantity = what user want
      const qtyToAdd = Math.min(quantity, stock.quantity);
      // Reduce stock quantity in quantity column
      await Stock.decrement("quantity", {
        //how much quantity to decrease
        by: qtyToAdd,
        where: { p_id: product.p_id },
        transaction: t,
      });
      // Add to cart
      await Cart.create(
        { p_id: product.p_id, price: product.price, quantity: qtyToAdd },
        { transaction: t }
      );
      // Add to response (array)
      addedProducts.push({
        p_id: product.p_id,
        p_name: product.p_name,
        price: product.price,
        quantity: qtyToAdd,
      });
    }
    await Cart.destroy({ where: {}, truncate: true, transaction: t });
    await t.commit();
    return addedProducts;
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
  addToCartProduct,
};
