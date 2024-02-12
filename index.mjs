import express from "express";
import { sayHello } from "./test.mjs";

const app = express();

app.get("/hello", sayHello);

app.use("/", (req, res) => res.status(200).send("HEALTHY"));

const { SERVER_PORT: port = 3000 } = process.env;

app.listen({ port }, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});
