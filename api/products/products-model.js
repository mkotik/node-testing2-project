const db = require("../../data/dbConfig");

const getAll = () => {
  return db("products");
};

const getById = (id) => {
  return db("products").where("id", id).first();
};

const add = async (product) => {
  const [newId] = await db("products").insert(product);
  return getById(newId);
};

const remove = async (id) => {
  await db("products").where("id", id).del();
  return getAll();
};

module.exports = { getAll, add, remove, getById };
