const express = require("express");
const { join } = require("path");
const cors = require("cors");
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
const reviewRouter = require("./reviews/reviews");

const server = express();
// PORT
const port = process.env.PORT || 5000;
const mongo_db = process.env.MONGO_URI;

const staticFolderPath = join(__dirname, "../public");
server.use(express.static(staticFolderPath));
server.use(express.json());
server.use(cors());

// ROUTES
server.use("/products", ProductRouter);
server.use("/reviews", reviewRouter);
// ERROR HANDLERS
server.use(notFoundHandler);
server.use(badRequestHandler);
server.use(genericErrorHandler);

console.log(listEndpoints(server));

// CONNECT TO MONGO
mongoose
  .connect(mongo_db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(
    server.listen(port, () => {
      console.log("Server is running on port", port);
    })
  )
  .catch((error) => console.log(error));
