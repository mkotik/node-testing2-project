const products = [
  { product_name: "Raspberry Pie", quantity: 19 },
  { product_name: "Blueberry Crumble", quantity: 25 },
  { product_name: "Danish Strudel", quantity: 40 },
];

exports.seed = function (knex) {
  return knex("products")
    .truncate()
    .then(function () {
      return knex("products").insert(products);
    });
};
