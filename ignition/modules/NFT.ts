import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "ethers";
import * as dotenv from "dotenv";

// 读取私钥
dotenv.config();
const privateKey = process.env.PRIVATE_KEY as string;

if (!privateKey) {
  throw new Error("Private key not set in .env");
}

// 使用 Ethers.js 获取钱包地址
const wallet = new ethers.Wallet(privateKey);
const ownerAddress = wallet.address;

const NFTModule = buildModule("NFTModule", (m) => {
  const baseURI = m.getParameter("baseURI", "ipfs://bafybeib3wtensaf7xambpv5zpwgeuyan2oel5ki3kzfwvxjuny4zobjcj4/747");

  // 使用动态获取的 owner 地址
  const nftContract = m.contract("MyNFT", [baseURI, ownerAddress], {
    path: "contracts/NFT.sol"
  });

  return { contracts: { nftContract } };
});

export default NFTModule;

