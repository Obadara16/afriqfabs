const mongoose = require("mongoose");

const designSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
      required: true,
    },
    categories: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
          required: true,
        },
        slug: {
          type: String,
          required: true,
        },
      },
    ],
    rows: {
      type: Number,
      required: true,
    },
    columns: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Design = mongoose.model("Design", designSchema);

module.exports = Design;
