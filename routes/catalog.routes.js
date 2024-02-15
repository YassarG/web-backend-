import express from "express";
import { prisma } from "../config/prisma.js";

const catalogRoutes = express.Router();

//get all catalogs
catalogRoutes.get("/", async (req, res) => {
  const catalog = await prisma.catalog.findMany();
  res.status(200).send(catalog);
});

//get all catalogs by id
catalogRoutes.get("/:id", async (req, res) => {
  const catalog = await prisma.catalog.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!catalog) res.status(404).send("catalog not found");
  else res.status(200).send(catalog);
});

//get post catalog

catalogRoutes.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) res.status(400).json({ message: "Harap isi bidang ini!" });
  const newCatalog = await prisma.catalog.create({
    data: {
      name: name,
    },
  });
  res.status(201).json({
    message: "catalog created",
    data: newCatalog,
  });
});

// get update catalog

catalogRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updateCatalog = await prisma.catalog.update({
    where: { id: parseInt(id) },
    data: { name: name },
  });
  res.status(200).json({
    message: `catalog with id: ${id} is updated`,
    data: updateCatalog,
  });
});

//get delete catalog
catalogRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.catalog.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.status(200).json({
    message: `catalog with id: ${id} succesfully deleted`,
  });
});

export { catalogRoutes };
