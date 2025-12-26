const sequelize = require("../models/dbConnection"); // ensure correct path
const Product = require("../models/Product");
const Stock = require("../models/Stock");

const deleteProductDetails = async (p_id) => {
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

module.exports = { deleteProductDetails };
