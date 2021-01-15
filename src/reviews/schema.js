const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema({
  comments: {
    type: String,
    required: true,
  },
});

module.exports = model("Reviews", ReviewSchema);
