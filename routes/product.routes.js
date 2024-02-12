const express = require("express");
const productRoutes = express.Router();
const { prisma } = require("../config/prisma");

productRoutes.get("/", async (req, res) => {
  const products = await prisma.product.findMany();
  res.status(200).send(products);
});
module.exports = { productRoutes };
