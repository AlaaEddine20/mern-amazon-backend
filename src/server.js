const express = require("express");
const { join } = require("path");
const listEndpoints = require("express-list-endpoints");
const mongoose = require("mongoose");

// ERROR HANLDERS
const {
  notFoundHandler,
  badRequestHandler,
  genericErrorHandler,
} = require("./errorHandler");

// ROUTER
const ProductRouter = require("./products/products");

const server = express();
// PORT
const port = process.env.port;

// ROUTES
server.use("/products", ProductRouter);

// EROR HANDLERS
server.use(notFoundHandler);
server.use(badRequestHandler);
server.use(genericErrorHandler);

console.log(listEndpoints(server));

// CONNECT TO MONGO
mongoose
  .connect(process.env.MONGO_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("Server is running on port", port);
    })
  )
  .catch((error) => console.log(error));
