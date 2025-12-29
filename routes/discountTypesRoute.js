const express = require("express");
const checkAuthUsingJwt = require("../middleware/checkAuth");
const router = express.Router(); //router instance
const discountService = require("../services/discounttypesDbQueries");
const { addDTO } = require("../dtos/discounttypes.dto");

//add discount types
router.post("/addDiscountType", checkAuthUsingJwt, async (req, res) => {
  try {
    const discountData = new addDTO(req.body);
    discountData.validate();
    await discountService.insertDiscountsTypes(
      discountData.id,
      discountData.flat,
      discountData.percent
    );
    return res.status(200).json({ message: "Discounttype added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
