# 🌱Farm2ForkChain
### Blockchain-Powered Transparent Agricultural Supply Chain

> Ensuring **trust, transparency, and traceability** from farm to consumer using blockchain.

---

## 🚀 Overview

AgriTrustChain is a decentralized platform designed to revolutionize the agricultural supply chain.  
By leveraging **blockchain technology**, it enables secure tracking of produce from farmers to consumers, ensuring **fair pricing, authenticity, and accountability** at every stage.

In a system where trust is often compromised, AgriTrustChain introduces a **tamper-proof, transparent, and verifiable ecosystem**.

---

## ❗ Problem Statement

- Farmers face **exploitation by middlemen** and receive unfair prices  
- Consumers lack **visibility into origin and quality** of produce  
- Supply chains suffer from **fraud, data manipulation, and inefficiency**  
- No reliable system exists for **end-to-end traceability**

---

## 💡 Solution

AgriTrustChain uses **blockchain + smart contracts + QR codes** to:

- Record every transaction **immutably** on-chain  
- Enable **real-time traceability** of produce  
- Provide **transparent pricing history**  
- Allow consumers to verify authenticity via **QR scanning**

---

## 🧠 Key Features

- 🔗 **Blockchain-Based Records** – Tamper-proof storage of all supply chain events  
- 📦 **Batch Tracking** – Each produce batch has a unique identity  
- 📲 **QR Code Traceability** – Scan to view origin, journey, and pricing  
- 🤝 **Role-Based Access** – Farmer, Distributor, Retailer, Consumer flows  
- ⚡ **Smart Contracts** – Automate ownership transfer and record updates  
- 🗂️ **Off-Chain Storage** – Store certificates/images using Firebase/MongoDB  

---

## 🏗️ Tech Stack

| Layer            | Technology                          |
|------------------|----------------------------------|
| Blockchain       | Ethereum (Sepolia / Polygon)      |
| Smart Contracts  | Solidity                          |
| Frontend         | React.js                          |
| Web3 Integration | ethers.js + MetaMask              |
| Backend (Opt.)   | Node.js / Firebase / MongoDB      |
| QR Integration   | qrcode.react                      |

---

## ⚙️ How It Works

1. 👨‍🌾 **Farmer** creates a produce batch → data stored on blockchain  
2. 🔄 **Distributor/Retailer** updates transport & ownership details  
3. 📦 Each batch gets a **QR Code**  
4. 📱 **Consumer scans QR** → views full journey (origin → pricing → quality)  

---

## 🔍 Why Blockchain?

- 🛡️ **Immutability** → Data cannot be altered or deleted  
- 👀 **Transparency** → All stakeholders see the same verified data  
- 🔗 **Traceability** → Track produce lifecycle end-to-end  
- ⚖️ **Fairness** → Reduces middlemen exploitation  

---

## 📊 Impact

- 📈 Improves **farmer income transparency**  
- 🛑 Reduces **fraud and fake data**  
- 🧾 Builds **consumer trust in food quality**  
- 🌍 Enables **scalable and ethical supply chains**  

---

## 🚧 Limitations & Future Scope

- ❗ Cannot physically prevent product tampering → requires IoT/tamper-proof packaging  
- 🌐 Add **IoT sensors** for quality monitoring (temperature, humidity)  
- 🤖 Integrate **AI for demand prediction & pricing insights**  
- 🏛️ Government integration for subsidies & certification  

---

## 📦 Prototype Features

- Add and track produce batches  
- Generate QR codes linked to blockchain records  
- View product history via QR scan  
- Simulate farmer → distributor → consumer flow  

---

## 🛠️ Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/agritrustchain.git

# Install dependencies
npm install

# Run the app
npm start
