import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const INITIAL_SUPPLY = parseEther("21000000"); // 2100 万个代币

const MyTokenModule = buildModule("MyTokenModule", (m) => {
  const initialSupply = m.getParameter("initialSupply", INITIAL_SUPPLY);

  const myToken = m.contract("MyToken", [initialSupply]); // 确保匹配 Solidity 合约名

  return { myToken };
});

export default MyTokenModule;
