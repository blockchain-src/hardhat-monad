// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import "hardhat/types/artifacts";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";

import { MyNFT$Type } from "./MyNFT";

declare module "hardhat/types/artifacts" {
  interface ArtifactsMap {
    ["MyNFT"]: MyNFT$Type;
    ["contracts/NFT.sol:MyNFT"]: MyNFT$Type;
  }

  interface ContractTypesMap {
    ["MyNFT"]: GetContractReturnType<MyNFT$Type["abi"]>;
    ["contracts/NFT.sol:MyNFT"]: GetContractReturnType<MyNFT$Type["abi"]>;
  }
}
