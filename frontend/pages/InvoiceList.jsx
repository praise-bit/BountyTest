import React, { useEffect, useState } from "react";
import InvoiceCard from "../components/InvoiceCard";

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/invoice/all")
      .then((res) => res.json())
      .then((data) => {
        setInvoices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📄 Invoices</h1>
      {loading ? (
        <p>Loading...</p>
      ) : invoices.length === 0 ? (
        <p>No invoices found.</p>
      ) : (
        invoices.map((inv) => <InvoiceCard key={inv._id} invoice={inv} />)
      )}
    </div>
  );
}

export default InvoiceList;
