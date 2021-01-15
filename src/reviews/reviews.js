const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema({
  comments: String,
  required: true,
});

module.exports = model("Reviews", ReviewSchema);
