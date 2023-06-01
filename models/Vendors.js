const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);
const VendorsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    officeLocation: {
      type: String,
      required: true,
    },
    imageProductShowCase: {
      type: String,
      required: true,
      unique: true,
    },
    images: {
      type: [String],

      max: 5,
    },
    brandName: {
      type: String,
      required: true,
      unique: true,
    },
    contactNumber: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    socialMediaHandles: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brandDescription: {
      type: String,
      required: true,
      max: 150,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      // required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      // required: true,
      default: 0,
    },
    priceRange: {
      type: String,
      required: true,
      // default: 0,
    },
    weeklyAvaliability: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtual: true,
    },
    toObject: {
      virtual: true,
    },
  }
);

module.exports = mongoose.model("Vendors", VendorsSchema);
