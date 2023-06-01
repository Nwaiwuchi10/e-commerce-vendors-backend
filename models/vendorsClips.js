const mongoose = require("mongoose");

const vendorsClipsSchema = mongoose.Schema(
  {
    vendors: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Vendors",
    },

    images: {
      type: [String],
      required: true,
      max: 5,
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

module.exports = mongoose.model("VendorsClips", vendorsClipsSchema);
