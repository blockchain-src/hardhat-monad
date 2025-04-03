#!/bin/bash

# 定义合约及其对应的文件路径
declare -A contracts
contracts=(
    [Lock]="ignition/modules/Lock.ts"
    [ERC20]="ignition/modules/erc20.ts"
    [NFT]="ignition/modules/NFT.ts"
    [Voting]="ignition/modules/voting.ts"
)

NETWORK="monadTestnet"
LOG_FILE="deployment_log.txt"

# 清空之前的日志
> "$LOG_FILE"

echo "🚀 开始部署智能合约到 $NETWORK..." | tee -a "$LOG_FILE"

for contract in "${!contracts[@]}"; do
    echo "\n⏳ 正在部署 $contract 合约..." | tee -a "$LOG_FILE"
    npx hardhat ignition deploy "${contracts[$contract]}" --network "$NETWORK" 2>&1 | tee -a "$LOG_FILE"
    
    if [ "${PIPESTATUS[0]}" -eq 0 ]; then
        echo "✅ $contract 合约部署成功!" | tee -a "$LOG_FILE"
    else
        echo "❌ $contract 合约部署失败，跳过..." | tee -a "$LOG_FILE"
        continue
    fi

done

echo "🎉 所有合约部署完成!" | tee -a "$LOG_FILE"
