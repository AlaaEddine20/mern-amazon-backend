const express = require("express");
const mongoose = require("mongoose");

// MODEL
const ProductModel = require("./schema");

// PRODUCT ROUTER
const productRouter = express.Router();

// POST PRODUCT
productRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = new ProductModel(req.body);
    const { _id } = await newProduct.save();

    res.status(201).send(_id);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET ALL PRODUCTS
productRouter.get("/", async (req, res, next) => {
  try {
    const products = await ProductModel.find({}).populate("comment");

    res.send(products);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// EDIT PRODUCT
productRouter.put("/:id", async (req, res, next) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );

    if (updatedProduct) {
      res.send(updatedProduct);
    } else {
      const error = new Error(`Product with ${req.params.id} not found!`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// DELETE PRODUCT
productRouter.delete("/:id", async (req, res, next) => {
  try {
    const productToDelete = await ProductModel.findByIdAndDelete(req.params.id);

    if (productToDelete) {
      res.send("Deleted");
    } else {
      const error = new Error(`Product with ${req.params.id} id not found`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = productRouter;
