const express = require("express");
const mongoose = require("mongoose");
// SCHEMA
const ReviewSchema = require("./schema");
const ProductModel = require("../products/schema");

const reviewRouter = express.Router();

// POST REVIEW
reviewRouter.post("/", async (req, res, next) => {
  try {
    const newReview = new ReviewSchema(req.body);
    const productId = req.body.productID;
    const product = await ProductModel.findByIdAndUpdate(productId, {
      $push: { comments: newReview },
    });
    const { _id } = await newReview.save();

    res.send(_id, product, "POSTED!");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET ALL REVIEWS OF A SINGLE PRODUCT
reviewRouter.get("/:productId", async (req, res, next) => {
  try {
    const comments = await ProductModel.findById(req.params.productId, {
      comments: 1,
      _id: 0,
    });
    console.log(comments);
    res.send(comments);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
module.exports = reviewRouter;
