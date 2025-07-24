Decentralized Invoice Verification System

A hybrid full-stack ERP/CRM extension that enables on-chain invoice integrity verification using Solidity smart contracts, MongoDB, Ethers.js, and a custom Node.js backend.
Designed to simulate a decentralized audit trail for B2B invoicing, using blockchain as a trust layer.

⸻

📦 Tech Stack
	•	Frontend: React + TailwindCSS (CodeSandbox)
	•	Backend: Node.js + Express + MongoDB
	•	Blockchain: Solidity (Hardhat), Ethers.js
	•	Storage: Hashing (SHA-256), optional IPFS (not implemented)
	•	Deployment (Chain): Sepolia Testnet (via Alchemy)
    PROJECT STRUCTURE
    ontracts/
│   └── InvoiceRegistry.sol     # Smart contract for invoice hash storage
├── backend/
│   ├── routes/
│   ├── models/                 # Invoice Mongoose schema
│   └── controllers/
├── frontend/
│   ├── components/
│   └── pages

         
         Smart Contract

File: contracts/InvoiceRegistry.sol
Handles storing and verifying SHA-256 hashes of invoices on-chain.

       Deployed Address


       ABI

       Clone the repo
       git clone https://github.com/praise-bit/invoice-registry
cd invoice-registry
             Backend setup
 cd backend
npm install
touch .env
# Add the following:
# MONGO_URI=your_mongodb_uri
# PRIVATE_KEY=your_wallet_private_key
# ALCHEMY_API_URL=https://eth-sepolia.g.alchemy.com/v2/your-api-key

npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
(All in the files)

cd ../frontend
npm install
touch .env
# Add:
# VITE_CONTRACT_ADDRESS=0xYourDeployedContractAddress
# VITE_ABI=Your_ABI_JSON_string (or load from a file)
# VITE_BACKEND_URL=http://localhost:5000

npm run dev
          (All in the files)


          Known Issues & Assumptions
	•	⚠️ MetaMask not working in browser-based sandbox: Contract interactions were simulated via backend using Hardhat and exposed APIs.
	•	✅ Workaround: Ethers.js + Alchemy for signing & interaction.
	•	🧪 Testing was kept minimal due to system restrictions.
	•	🔒 Contract stores SHA-256 hash, not full invoice data for privacy.
	•	📦 IPFS storage for invoice files was considered but not implemented.
	•	🔧 Used Alchemy instead of Infura due to API limits.

⸻

✅ What We Accomplished
	•	✅ Fully working smart contract on Sepolia
	•	✅ Frontend integration for “Verify on Blockchain”
	•	✅ MongoDB backend + invoice hashing
	•	✅ REST APIs and ABI/contract syncing
	•	✅ Clean and modular code split for future scaling

⸻

❌ What We Couldn’t Do (Due to Platform Limitations)
	•	❌ Couldn’t run MetaMask in embedded browser (e.g. CodeSandbox)
	•	❌ No full-featured test suite or deployment pipeline
	•	❌ Couldn’t simulate full multi-user invoice flows (lack of persistent hosting)

⸻

💡 Improvements (With More Time or Better Resources)
	•	📂 Add IPFS or Filecoin for full invoice backup
	•	🔁 Multi-signature approval flow for invoices
	•	📊 Dashboard for on-chain vs off-chain invoice insights
	•	✅ CI/CD pipelines + auto contract verification on Etherscan

⸻

🤝 Special Notes
	•	Contract deployed using Hardhat + Alchemy, private keys securely injected via .env.
	•	This was built under tight constraints, including no local VS Code and limited dApp interaction environments.
Still, the system demonstrates the core concept of decentralized invoice verification with blockchain-backed trust.




