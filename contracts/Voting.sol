// contracts/voting.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    string public proposal;
    mapping(address => bool) public votes;
    uint public yesCount;
    uint public noCount;

    event Voted(address indexed voter, bool vote);

    constructor(string memory _proposal) {
        proposal = _proposal;
    }

    function vote(bool _vote) external {
        require(!votes[msg.sender], "Already voted");
        votes[msg.sender] = true;
        if (_vote) {
            yesCount++;
        } else {
            noCount++;
        }
        emit Voted(msg.sender, _vote);
    }
}
