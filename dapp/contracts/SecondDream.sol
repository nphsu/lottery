pragma solidity >=0.4.21 <0.6.0;

import "./DreamTicket.sol";

contract SecondDream is DreamTicket {

  // TODO: write test code
  
  event Challenge(
    address player
  );

  mapping(uint => address[]) private applicants;

  mapping(uint => bytes32) private seed;

  mapping(uint => uint) private applicantsNum;

  mapping(uint => address) private winner;

  /**
   * It doesn't decide who is winner.
   */
  function challenge() public payable {
    require(term == Term.BUY || term == Term.REVEAL);
    require(introducers[msg.sender] > 0);
    applicants[round].push(msg.sender);
    introducers[msg.sender]--;
    seed[round] = keccak256(abi.encodePacked(seed[round], msg.sender));
    applicantsNum[round]++;
    emit Challenge(msg.sender);
  }

  function getApplicants() public view returns (address[] memory) {
    return applicants[round];
  }

  function drawSecondDreamWinner() public {
    require(term == Term.RESULT);
    uint seedIndex = uint(seed[round]) % applicantsNum[round];
    winner[round] = applicants[round][seedIndex];
  }
}