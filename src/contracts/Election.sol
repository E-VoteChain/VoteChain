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

    // Mapping for the voters
    mapping(address=>mapping(uint=>bool)) voted;
    mapping(uint => Election) public elections; 
    mapping(uint => Candidate) public candidates;
    mapping(address=>Voter) public voters;
    
    address[] voterslist;
    uint public candidatesCount;
    uint public electionCount;
    uint public totalregisteredvoters;

    modifier ownerOn() {
       require(msg.sender==owner);
       _;
    }

    modifier checkvote(address _address,uint _candidateID,uint _electionid) {
        require(_address == msg.sender,"You can only cast your own vote");
        require(elections[_electionid].candidatesids.length>=2 && elections[_electionid].status==2,"Voting has not started");
        require(candidates[_candidateID].election_id==_electionid,"Not a valid candidate");
        require(!voted[_address][_electionid],"You have already voted");
        require(voters[_address].authorized,"You have no right to Vote");
       _;
    }
    
    function isAdmin(address user) public view returns(bool){
        return owner==msg.sender || owner == user;
    }

    function createElection(string memory _purpose) public ownerOn{
        electionCount++;
        elections[electionCount]=Election(electionCount,_purpose,1,new uint[](0),0);
    }
} 