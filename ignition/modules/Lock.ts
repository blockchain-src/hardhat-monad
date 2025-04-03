// 此设置使用 Hardhat Ignition 来管理智能合约部署。
// 了解更多信息：https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const JAN_1ST_2030 = 1893456000;  // 定义了 2030 年 1 月 1 日的 Unix 时间戳。
const ONE_GWEI: bigint = parseEther("0.001"); //定义了 0.001 作为默认的锁定金额。

const LockModule = buildModule("LockModule", (m) => {
  const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
  const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);

  const lock = m.contract("Lock", [unlockTime], {
    value: lockedAmount,
  });

  return { lock };
});

export default LockModule;
