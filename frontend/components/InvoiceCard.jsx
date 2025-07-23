import React, { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const CONTRACT_ABI = JSON.parse(import.meta.env.VITE_CONTRACT_ABI);

function InvoiceCard({ invoice }) {
  const [verifyStatus, setVerifyStatus] = useState("");
  const [blockNumber, setBlockNumber] = useState(null);
  const [etherscanLink, setEtherscanLink] = useState("");

  const handleVerify = async () => {
    try {
      if (!window.ethereum) return setVerifyStatus("❌ MetaMask not found");

      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const isStored = await contract.isInvoiceHashStored(invoice.hash);

      if (isStored) {
        setVerifyStatus("✅ Verified on-chain");

        if (invoice.txHash.startsWith("0xSIMULATED")) {
          setBlockNumber("N/A");
          setEtherscanLink("Simulated transaction");
        } else {
          const receipt = await provider.getTransactionReceipt(invoice.txHash);
          setBlockNumber(receipt.blockNumber);
          setEtherscanLink(`https://sepolia.etherscan.io/tx/${invoice.txHash}`);
        }
      } else {
        setVerifyStatus("❌ Tampered or not found");
      }
    } catch (err) {
      console.error(err);
      setVerifyStatus("❌ Error verifying");
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", marginBottom: "1rem", padding: "1rem" }}>
      <h3>Invoice #{invoice.invoiceId}</h3>
      <p><strong>Date:</strong> {invoice.date}</p>
      <p><strong>Total:</strong> ₦{invoice.total}</p>
      <p><strong>Hash:</strong> {invoice.hash}</p>
      <button onClick={handleVerify}>Verify on Blockchain</button>
      {verifyStatus && (
        <div>
          <p>Status: {verifyStatus}</p>
          {blockNumber && <p>Block: {blockNumber}</p>}
          {etherscanLink && (
            <p>
              <a href={etherscanLink} target="_blank" rel="noreferrer">
                View on Etherscan
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default InvoiceCard;
