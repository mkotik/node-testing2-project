const express = require("express");
const Products = require("./products-model");
const { checkIfIdExists } = require("./products-middleware");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await Products.getAll();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkIfIdExists, async (req, res, next) => {
  res.status(200).json(req.product);
});

router.post("/", async (req, res, next) => {
  try {
    const product = await Products.add(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", checkIfIdExists, async (req, res, next) => {
  const { id } = req.params;
  try {
    const remainingProds = await Products.remove(id);
    res.status(200).json(remainingProds);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
