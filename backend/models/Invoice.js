const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  invoiceId: { type: String, required: true },
  date: { type: String, required: true },
  total: { type: String, required: true },
  hash: { type: String, required: true },
  txHash: { type: String, required: true }
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
