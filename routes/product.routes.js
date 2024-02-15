import express from "express";
import { prisma } from "../config/prisma";

const productRoutes = express.Router();

//get all product
productRoutes.get("/", async (req, res) => {
  const products = await prisma.product.findMany();
  res.status(200).send(products);
});

//get product by id
productRoutes.get("/:id", async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!product)
    res.status(404).json({
      message: "product not found",
    });
  else res.status(200).send(product);
});

//create product
productRoutes.post("/", async (req, res) => {
  const newProduct = await prisma.product.create({
    data: {
      name: req.body.name,
      price: parseInt(req.body.price),
      imageUrl: req.body.imageUrl,
    },
  });
  res.status(201).json({
    message: "Product created!",
    data: newProduct,
  });
});

//update by id

productRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, imageUrl } = req.body;
  const updateProduct = await prisma.product.update({
    where: { id: parseInt(id) },
    data: {
      name: name,
      price: parseInt(price), // Convert price to float (assuming it's a decimal number)
      imageUrl: imageUrl,
    },
  });
  res.status(200).json({
    message: `catalog with id ${id} is updated`,
    data: updateProduct,
  });
});

//delete product

productRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.product.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.status(200).json({
    message: `product with id: ${id} succesfully deleted`,
  });
});

export { productRoutes };
