/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    email: { type: String, require: true },
    orderId: { type: String, require: true },
    paymentInfo: { type: String, default: "" },
    products: [
      {
        productId: { type: String, require: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    address: { type: String, require: true },
    amount: { type: Number, require: true },
    status: { type: String, default: "Pending", require: true },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
