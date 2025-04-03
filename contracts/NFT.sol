// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    // 用于存储基础 URI
    string private _baseTokenURI;

    // 构造函数，传入基础 URI 和合约拥有者地址
    constructor(string memory baseURI, address initialOwner) ERC721("MyNFT", "NFT") Ownable(initialOwner) {
        _baseTokenURI = baseURI;
    }

    // 覆盖 _baseURI 方法，返回合约的基础 URI
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    // 创建新的 NFT
    function mint(address to, uint256 tokenId, string memory tokenURI) public onlyOwner {
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    // 修改基础 URI，只有合约拥有者可以执行
    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }
}
