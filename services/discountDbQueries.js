const Discount = require("../models/discountsModel");
const sequelize = require("../models/dbConnection");

// add discounts
const insertDiscounts = async (id, type) => {
  const t = await sequelize.transaction();
  try {
    const discount = await Discount.create(
      { p_id: id, d_type: type },
      { transaction: t }
    );
    await t.commit();
    return discount;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

//delete discount on products
const deleteDiscounts = async (id) => {
  const t = await sequelize.transaction();
  try {
    const deletedCount = await Discount.destroy(
      {
        where: { d_id: id },
      },
      { transaction: t }
    );
    if (deletedCount === 0) {
      throw new Error("Discount not found");
    }
    await t.commit();
    return true;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

//modify discount on products
const modifyDiscount = async (id, type) => {
  const t = await sequelize.transaction();
  try {
    const [updatedCount] = await Discount.update(
      {
        d_type: type,
      },
      {
        where: { d_id: id },
        transaction: t,
      }
    );
    if (updatedCount === 0) {
      throw new Error("Discount not found");
    }
    await t.commit();
    return true;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

module.exports = { insertDiscounts, deleteDiscounts, modifyDiscount };
