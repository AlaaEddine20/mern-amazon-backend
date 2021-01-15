const express = require("express");
// SCHEMA
const ReviewSchema = require("./schema");
const ProductModel = require("../products/schema");

const reviewRouter = express.Router();

reviewRouter.post("/", async (req, res, next) => {
  try {
    const newReview = new ReviewSchema(req.body);
    const productId = req.body.comments;
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

module.exports = reviewRouter;
