import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress, parseGwei } from "viem";

describe("Lock", function () {
  // 定义一个 fixture（测试夹具），在每个测试中重复使用相同的部署环境
  // 使用 loadFixture 仅运行一次部署逻辑，并快照该状态
  // 在每个测试执行前，将 Hardhat 网络重置到该快照
  async function deployOneYearLockFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60; // 一年的秒数

    const lockedAmount = parseGwei("1"); // 锁定的金额（以 Gwei 计算）
    const unlockTime = BigInt((await time.latest()) + ONE_YEAR_IN_SECS); // 计算解锁时间

    // 默认使用第一个钱包地址（账户）部署合约
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    // 部署 Lock 合约，并传入解锁时间，同时转入锁定资金
    const lock = await hre.viem.deployContract("Lock", [unlockTime], {
      value: lockedAmount,
    });

    // 获取公共 RPC 客户端
    const publicClient = await hre.viem.getPublicClient();

    return {
      lock,
      unlockTime,
      lockedAmount,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("部署", function () {
    it("应该正确设置 unlockTime（解锁时间）", async function () {
      const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

      expect(await lock.read.unlockTime()).to.equal(unlockTime);
    });

    it("应该正确设置合约所有者", async function () {
      const { lock, owner } = await loadFixture(deployOneYearLockFixture);

      expect(await lock.read.owner()).to.equal(
        getAddress(owner.account.address)
      );
    });

    it("应该正确接收并存储锁定的资金", async function () {
      const { lock, lockedAmount, publicClient } = await loadFixture(
        deployOneYearLockFixture
      );

      expect(
        await publicClient.getBalance({
          address: lock.address,
        })
      ).to.equal(lockedAmount);
    });

    it("如果 unlockTime 不是未来时间，则部署应失败", async function () {
      // 这里不使用 fixture，因为我们需要不同的部署条件
      const latestTime = BigInt(await time.latest());
      await expect(
        hre.viem.deployContract("Lock", [latestTime], {
          value: 1n,
        })
      ).to.be.rejectedWith("Unlock time should be in the future"); // 期望报错：解锁时间应设为未来
    });
  });

  describe("提款", function () {
    describe("验证", function () {
      it("如果提款时间未到，应返回正确的错误", async function () {
        const { lock } = await loadFixture(deployOneYearLockFixture);

        await expect(lock.write.withdraw()).to.be.rejectedWith(
          "You can't withdraw yet"
        ); // 期望报错：当前不可提款
      });

      it("如果由非所有者调用提款，应返回正确的错误", async function () {
        const { lock, unlockTime, otherAccount } = await loadFixture(
          deployOneYearLockFixture
        );

        // 在 Hardhat 网络中增加时间，使其达到解锁时间
        await time.increaseTo(unlockTime);

        // 使用其他账户实例化合约
        const lockAsOtherAccount = await hre.viem.getContractAt(
          "Lock",
          lock.address,
          { client: { wallet: otherAccount } }
        );
        await expect(lockAsOtherAccount.write.withdraw()).to.be.rejectedWith(
          "You aren't the owner"
        ); // 期望报错：调用者不是合约所有者
      });

      it("如果解锁时间已到，且由所有者调用，则提款应成功", async function () {
        const { lock, unlockTime } = await loadFixture(
          deployOneYearLockFixture
        );

        // 交易默认使用第一个账户（即合约所有者）执行
        await time.increaseTo(unlockTime);

        await expect(lock.write.withdraw()).to.be.fulfilled; // 期望提款成功
      });
    });

    describe("事件", function () {
      it("提款成功后应触发 Withdrawal 事件", async function () {
        const { lock, unlockTime, lockedAmount, publicClient } =
          await loadFixture(deployOneYearLockFixture);

        await time.increaseTo(unlockTime);

        const hash = await lock.write.withdraw();
        await publicClient.waitForTransactionReceipt({ hash });

        // 获取最新区块中的提款事件
        const withdrawalEvents = await lock.getEvents.Withdrawal();
        expect(withdrawalEvents).to.have.lengthOf(1); // 期望事件仅触发一次
        expect(withdrawalEvents[0].args.amount).to.equal(lockedAmount); // 期望提款金额正确
      });
    });
  });
});
