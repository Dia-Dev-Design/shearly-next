import { Schema, models, model } from "mongoose";

const transactionSchema = new Schema(
  {
    dateTime: {
      date: String,
      time: String,
    },
    tax: Number,
    discount: Number,
    subtotal: Number,
    total: Number,
    client: { type: Schema.Types.ObjectId, ref: "Client" },
    appointment: { type: Schema.Types.ObjectId, ref: "Appointment" },
    business: { type: Schema.Types.ObjectId, ref: "Business" },
  },
  { timestamps: true }
);

module.exports = models.Transaction || model("Transaction", transactionSchema);
