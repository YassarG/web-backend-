require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { parse } = require("dotenv");
const { catalogRoutes } = require("./routes/catalog.routes");
const { productRoutes } = require("./routes/product.routes");
const PORT = process.env.PORT || 3000;

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
