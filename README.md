# 部署时间锁合约到 Monad 测试网
npx hardhat ignition deploy ignition/modules/Lock.ts --network monadTestnet

# 部署 erc20 合约到 Monad 测试网
npx hardhat ignition deploy ignition/modules/erc20.ts --network monadTestnet

# 部署时 NFT 合约到 Monad 测试网
npx hardhat ignition deploy ignition/modules/NFT.ts --network monadTestnet

# 部署时投票合约到 Monad 测试网
npx hardhat ignition deploy ignition/modules/voting.ts --network monadTestnet

# ==========================================================================

# 要将相同的代码重新部署到不同的地址，请使用以下命令：
npx hardhat ignition deploy ignition/modules/<XXXX.ts> --network monadTestnet --reset

# 使用 Sourcify 在 Monad 上进行合约验证。部署后，你可以运行以下命令验证你的合约：
npx hardhat verify <contract_address> --network monadTestnet
