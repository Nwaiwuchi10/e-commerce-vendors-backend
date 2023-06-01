const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const OrderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    usersEmail: {
      type: String,
    },
    orderItems: [
      {
        brandName: { type: String, required: true },
        image: { type: String, required: true },
        priceAgreed: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Vendors",
        },
      },
    ],
    eventAddress: {
      eventLocation: { type: String, required: true },
      city: { type: String, required: true },
      eventType: { type: String, required: true },
      eventDate: { type: String, required: true },
      eventTime: { type: String, required: true },
      eventDuration: { type: String, required: true },
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
module.exports = mongoose.model("Order", OrderSchema);
