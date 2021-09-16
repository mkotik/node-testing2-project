const express = require("express");
const productsRouter = require("./products/products-router");
const server = express();
server.use(express.json());

server.use("/api/products", productsRouter);

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});
module.exports = server;
