// require("dotenv").config();
import express from "express";
import cors from "cors";
// const { parse } = require("dotenv");
import { config } from "dotenv";
import { catalogRoutes } from "./routes/catalog.routes.js";
import { productRoutes } from "./routes/product.routes.js";

config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("here is the response!");
});

// routes
app.use("/catalogs", catalogRoutes);
app.use("/products", productRoutes);

app.all("*", async (req, res) => {
  res.json({
    message: "Routes you're looking is not found!",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is already running at http://localhost:${PORT}`);
});
