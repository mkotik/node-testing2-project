const Products = require("./products-model");

const checkIfIdExists = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Products.getById(id);
    if (product) {
      req.product = product;
      next();
    } else {
      next({ status: 404, message: "ID not found" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { checkIfIdExists };
