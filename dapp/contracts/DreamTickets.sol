pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

import "./Ownable.sol";

contract DreamTickets is Ownable {

  event Buy(
    address buyer
  );

  struct Entry {
    address buyer;
    SoldoutStatus status;
  }

  enum SoldoutStatus {
    NOT_SELLING,
    BUY,
    REVEALED
  }

  enum Term {
    BUY,
    REVEAL,
    RESULT
  }

  ////////////////////////////////////////
  // Always public
  ////////////////////////////////////////
  
  // A ticket price per a ticket
  uint private TICKET_PRICE = 1e15;

  // The total number of ticket which is sold in a term
  uint private TICKET_TOTAL = 5000;

  // Entry player's number
  mapping(uint => uint) private entryCount;

  // num => CommitmentHash(BuyerAddress * num * passcode)
  mapping(uint => mapping(uint => bytes32)) private commitments;

  // If you enter the introducer, it is incremented
  mapping(address => uint) private introducers;

  Term private term;

  uint private round;


  ////////////////////////////////////////
  // Public after reveal
  ////////////////////////////////////////

  // TicketNumber => BuyerAddress
  mapping(uint => mapping(uint => Entry)) private entries;

  // BuyerAddress => TicketNumbers
  mapping(uint => mapping(address => uint[])) private tickets;


  // The current seed which determine the number of winner
  mapping(uint => bytes32) private seed;

  // The winner of a current game
  mapping(uint => address) private winner;


  constructor () public {
    round = 0;
  }

  // initNumbers is initialize arrays of numbers
  // The game will be reset
  function initEntries() private {
    round++;
  }

  // buy is used when you pay ETH and apply a lottery
  // A player bought a ticket but still not end of process
  function buy (uint _num, uint _passcode) public payable {
    require(msg.value == TICKET_PRICE);
    require(_num >= 0 && _num < TICKET_TOTAL);
    require(term == Term.BUY);
    require(commitments[round][_num] == 0);

    entryCount[round]++;

    bytes32 commitment = createCommitment(msg.sender, _num, _passcode);
    commitments[round][_num] = commitment;

    emit Buy(msg.sender);

    if (entryCount[round] == TICKET_TOTAL) {
      term = Term.REVEAL;
      // TODO: count down in a week
    }
  }

  function buyWithIntroducer(uint _num, uint _passcode, address _introducer) public payable {
    buy(_num, _passcode);
    // register introducer
    introducers[_introducer]++;
    // TODO: Introduce Event
  }
  

  function createCommitment(address _user, uint _num, uint _passcode) public pure returns (bytes32) {
    return keccak256(abi.encodePacked(_user, _num, _passcode));
  }


  function reveal (uint _num, uint _passcode) public {
    require(term == Term.REVEAL);
    
    bytes32 commitment = createCommitment(msg.sender, _num, _passcode);
    require(commitments[round][_num] == commitment);

    seed[round] = keccak256(abi.encodePacked(seed[round], commitment));

    Entry memory entry = Entry(msg.sender, SoldoutStatus.REVEALED);
    entries[round][_num] = entry;
    tickets[round][msg.sender].push(_num);
  }

  function drawWinner () public /*onlyOwner*/ {
    require(term == Term.RESULT);
    uint seedIndex = uint(seed[round]) % TICKET_TOTAL;
    winner[round] = entries[round][seedIndex].buyer;
  }

  function nextGame () public /* onlyOwner */ {
    round++;
  }

  function setPrice (uint price) public {
    TICKET_PRICE = price;
  }

  function getPrice () public view returns (uint) {
    return TICKET_PRICE;
  }

  function getEntryCount () public view returns (uint) {
    return entryCount[round];
  }



  function getNumber(uint num) public view returns (bytes32) {
    return commitments[round][num];
  }

  function getIntroducedCount() public view returns (uint) {
    return introducers[msg.sender];
  }

  function getBalance() public view returns (uint) {
    return address(this).balance;
  }

  function getRound() public view returns (uint) {
    return round;
  }
}