const Categories = require("../models/categoriesModel");
const sequelize = require("../models/dbConnection");

//insert new category
const insertNewCategories = async (name) => {
  const t = await sequelize.transaction();
  try {
    const category = await Categories.create(
      { c_name: name },
      { transaction: t }
    );
    await t.commit();
    return category;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

//delete categories
const deletecategories = async (id) => {
  const t = await sequelize.transaction();
  try {
    const deletedCount = await Categories.destroy({
      where: { c_id: id },
      transaction: t,
    });
    if (deletedCount === 0) {
      throw new Error("Category not found");
    }
    await t.commit();
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

module.exports = { insertNewCategories, deletecategories };
