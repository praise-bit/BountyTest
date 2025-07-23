const express = require("express");
const crypto = require("crypto");
const { ethers } = require("ethers");
const Invoice = require("../models/Invoice");

const router = express.Router();

// POST /api/invoice
router.post("/invoice", async (req, res) => {
  try {
    const { invoiceId, date, total } = req.body;
    const inputStr = `${invoiceId}|${date}|${total}`;
    const hash = crypto.createHash("sha256").update(inputStr).digest("hex");

    const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
    const contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      JSON.parse(process.env.CONTRACT_ABI),
      provider
    );

    // Simulated tx since no private key
    const txHash = "0xSIMULATED_" + Math.random().toString(16).slice(2, 10);

    const invoice = new Invoice({ invoiceId, date, total, hash, txHash });
    await invoice.save();

    res.json({ message: "Simulated invoice stored", hash, txHash });
  } catch (err) {
    console.error("Store error:", err);
    res.status(500).json({ error: "Failed to store invoice" });
  }
});

// GET /api/invoice/all
router.get("/invoice/all", async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
});

module.exports = router;
