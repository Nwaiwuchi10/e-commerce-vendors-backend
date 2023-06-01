const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
    // isSeen: {
    //   type: Boolean,
    //   required: true,
    //   default: false,
    // },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Notify", notificationSchema);
