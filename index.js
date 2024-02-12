require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { prisma } = require("./config/prisma");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("here is the response!");
});

app.get("/catalogs", async (req, res) => {
  const catalog = await prisma.catalog.findMany();
  res.status(200).send(catalog);
});

// app.use("/products", productRoutes);

app.post("/products/post", async (req, res) => {
  res.send("ini buat ngepost");
});
app.delete("/products/delete", async (req, res) => {
  res.send("ini buat ngedelete");
});
app.put("/products/put", async (req, res) => {
  res.send("ini buat put");
});

app.all("*", async (req, res) => {
  res.send("server not found!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is already running at http://localhost:${PORT}`);
});
