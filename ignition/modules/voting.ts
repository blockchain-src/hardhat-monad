import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const VotingModule = buildModule("VotingModule", (m) => {
  const proposal = m.getParameter("proposal", "Should we adopt new governance?");

  const votingContract = m.contract("Voting", [proposal], {
    path: "contracts/voting.sol"
  });

  return { contracts: { votingContract } };
});

export default VotingModule;
