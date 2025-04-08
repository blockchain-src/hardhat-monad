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
    # 分隔线 + 合约提示
    printf "\n-------------------------------------------------------\n" | tee -a "$LOG_FILE"
    echo "⏳ 正在部署 $contract 合约..." | tee -a "$LOG_FILE"

    # 执行部署命令并记录日志
    npx hardhat ignition deploy "${contracts[$contract]}" --network "$NETWORK" 2>&1 | tee -a "$LOG_FILE"
    
    # 检查部署是否成功
    if [ "${PIPESTATUS[0]}" -eq 0 ]; then
        echo "✅ $contract 合约部署成功!" | tee -a "$LOG_FILE"
    else
        echo "❌ $contract 合约部署失败，跳过..." | tee -a "$LOG_FILE"
        continue
    fi
done

# 最后提示
printf "\n🎉 所有合约部署完成!\n" | tee -a "$LOG_FILE"
