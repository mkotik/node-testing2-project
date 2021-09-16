const db = require("../../data/dbConfig");

const getAll = () => {
  return db("products");
};

module.exports = { getAll };
