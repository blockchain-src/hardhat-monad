import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

// Voting Module
const VotingModule = buildModule("VotingModule", (m) => {
  const proposal = m.getParameter("proposal", "Should we adopt new governance?");
  const votingContract = m.contract("Voting", [proposal], { path: "contracts/voting.sol" });
  return { contracts: { votingContract } };
});

// MyToken Module
const INITIAL_SUPPLY: bigint = parseEther("21000000");
const MyTokenModule = buildModule("MyTokenModule", (m) => {
  const initialSupply = m.getParameter("initialSupply", INITIAL_SUPPLY);
  const myTokenContract = m.contract("MyToken", [initialSupply], { path: "contracts/erc20.sol" });
  return { contracts: { myTokenContract } };
});

// Lock Module
const JAN_1ST_2030 = 1893456000;
const ONE_GWEI: bigint = parseEther("0.001");

const LockModule = buildModule("LockModule", (m) => {
  const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
  const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);

  const lockContract = m.contract("Lock", [unlockTime], {
    path: "contracts/Lock.sol",
    value: lockedAmount,
  });

  return { contracts: { lockContract } };
});

export { VotingModule, MyTokenModule, LockModule };
