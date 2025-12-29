const express = require("express");
const checkAuthUsingJwt = require("../middleware/checkAuth");
const router = express.Router(); //router instance
const DiscountService = require("../services/discountDbQueries");
const { addDTO, deleteDTO, modifyDTO } = require("../dtos/discount.dto");

//adding discount on products
router.post("/addDiscount", checkAuthUsingJwt, async (req, res) => {
  try {
    const discountData = new addDTO(req.body);
    discountData.validate();
    await DiscountService.insertDiscounts(discountData.id, discountData.type);
    return res.status(200).json({ message: "Discount added successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
});

//delete discount on products
router.delete("/deleteDiscounts", checkAuthUsingJwt, async (req, res) => {
  try {
    const discountData = new deleteDTO(req.body);
    discountData.validate();
    await DiscountService.deleteDiscounts(discountData.id);
    return res.status(200).json({ message: "Discount deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
});

//modify discount on products
router.patch("/modifyDiscounts", checkAuthUsingJwt, async (req, res) => {
  try {
    const discountData = new addDTO(req.body);
    discountData.validate();
    await DiscountService.modifyDiscount(discountData.id, discountData.type);
    return res.status(200).json({ message: "Discount modified successfully" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
