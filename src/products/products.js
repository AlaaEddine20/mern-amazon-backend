const express = require("express");
const mongoose = require("mongoose");

// MODEL
const ProductModel = require("./schema");

// PRODUCT ROUTER
const router = express.Router();

// POST PRODUCT
router.post("/", async (req, res, next) => {
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
router.get("/", async (req, res, next) => {
  try {
    const products = await ProductModel.find({}).populate("comments");

    res.send(products);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
