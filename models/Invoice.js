const mongoose = require("mongoose");

const InvoiceSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Payment",
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Invoice", InvoiceSchema);
