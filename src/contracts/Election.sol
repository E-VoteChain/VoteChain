// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
// Smart Contract for the Voting application
contract VotingForPurpose{

    // Refers to the owner
    address owner;

    constructor(){
        owner = msg.sender;
    }
} 