const express = require("express");
const Products = require("./products-model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await Products.getAll();
    res.status(200).json(products);
  } catch {
    next(err);
  }
});

module.exports = router;
