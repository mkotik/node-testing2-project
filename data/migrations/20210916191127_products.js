exports.up = function (knex) {
  return knex.schema.createTable("products", (tbl) => {
    tbl.increments();
    tbl.string("product_name", 128).unique().notNullable();
    tbl.integer("quantity").unsigned();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("products");
};
