const { Schema, model } = require("mongoose");

const ProductModel = new Schema(
  {
    name: String,
    required: true,
  },
  {
    desctiption: String,
    required: true,
  },
  {
    imageURL: String,
  },
  {
    category: String,
    required: true,
  },
  {
    price: Number,
    required: true,
  },
  {
    comments: { type: Schema.Types.ObjectId, ref: "reviews" },
  },
  {
    rate: {
      type: { Number, max: 5 },
    },
    required: true,
  },
  { timestamps: true }
);

module.exports = model("Product", ProductModel);
