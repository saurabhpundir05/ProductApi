const sequelize = require("../models/dbConnection");
const DiscountTypes = require("../models/discountsTypes");

//insert discount types
const insertDiscountsTypes = async (id, flat, percent) => {
  const t = await sequelize.transaction();
  try {
    const discounttype = await DiscountTypes.create(
      {
        d_id: id,
        d_flat: flat,
        d_percent: percent,
      },
      { transaction: t }
    );
    await t.commit();
    return discounttype;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

module.exports = { insertDiscountsTypes };
