// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
// Smart Contract for the Voting application
contract VotingForPurpose{

    // Refers to the owner
    address owner;

    constructor(){
        owner = msg.sender;
    }

    struct Election{
        uint id;
        string purpose;
        uint status;
        uint[] candidatesids;
        uint totalVotes;
    }
 
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
        string slogan;
        uint election_id;
    }

    struct Voter{
        string votername;
        bool authorized; 
    }
} 