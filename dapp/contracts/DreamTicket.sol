pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

import './Ownable.sol';

contract DreamTicket is Ownable {

  event Buy(
    address buyer
  );

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
  uint private TICKET_TOTAL;
  // uint private TICKET_TOTAL = 10; // DEV

  // 14 days to change to the reveal term
  uint private BUY_TERM = 14 * 24 * 60 * 60;

  // 10 days to change to the winning term
  uint private REVEAL_TERM = 10 * 24 * 60 * 60;
  
  // Buy player's number
  mapping(uint => uint) private buyCount;

  mapping(uint => uint256) internal buyEndTime;

  // num => CommitmentHash(BuyerAddress * num * passcode)
  mapping(uint => mapping(uint => bytes32)) private commitments;

  // BuyerAddress => TicketNumbers
  mapping(uint => mapping(address => uint[])) private addrToNumsOnBuyTerm;

  // If you enter the introducer, it is incremented
  mapping(address => uint) internal introducers;

  Term internal term;

  uint internal round;


  ////////////////////////////////////////
  // Public after reveal
  ////////////////////////////////////////

  // Reveal player's number
  mapping(uint => uint) private revealCount;

  mapping(uint => uint256) internal revealEndTime;

  // TicketNumber => BuyerAddress
  mapping(uint => mapping(uint => address payable)) private numToAddr;

  // BuyerAddress => TicketNumbers
  mapping(uint => mapping(address => uint[])) private addrToNumsOnRevealTerm;

  // The current seed which determine the number of winner
  mapping(uint => bytes32) private seed;

  // The winner of a current game
  mapping(uint => address payable) private winner;


  constructor (uint ticketTotal) public {
    TICKET_TOTAL = ticketTotal;
    round = 0;
    initEntries();
  }

  /// @notice The game will be reset
  function initEntries() private {
    round++;
    uint256 _now = block.timestamp;
    buyCount[round] = 0;
    buyEndTime[round] = _now + BUY_TERM;
    revealEndTime[round] = _now + REVEAL_TERM;
    revealCount[round] = 0;
  }

  /// @notice A player can buy a ticket but the process still not be end
  /// @param _num The ticket number (0-4999)
  /// @param _passcode This is necessary to create random (1000-9999)
  function buy (uint _num, uint _passcode) public payable {
    require(msg.value == TICKET_PRICE);
    require(_num >= 0 && _num < TICKET_TOTAL);
    require(term == Term.BUY);
    require(commitments[round][_num] == 0);
    require(_passcode >= 1000 && _passcode < 10000);

    buyCount[round]++;

    bytes32 commitment = createCommitment(msg.sender, _num, _passcode);
    commitments[round][_num] = commitment;
    addrToNumsOnBuyTerm[round][msg.sender].push(_num);

    emit Buy(msg.sender);

    if (buyCount[round] == TICKET_TOTAL) {
      nextTerm();
      // TODO: count down in a week
    }
  }

  /// @notice A player can buy a ticket with introducer address
  /// @param _num The ticket number (0-4999)
  /// @param _passcode This is necessary to create random (1000-9999)
  function buyWithIntroducer(uint _num, uint _passcode, address _introducer) public payable {
    buy(_num, _passcode);
    require(msg.sender != _introducer);
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

    // double reveal
    require(numToAddr[round][_num] != msg.sender);

    seed[round] = keccak256(abi.encodePacked(seed[round], commitment));
    revealCount[round]++;
    numToAddr[round][_num] = msg.sender;
    addrToNumsOnRevealTerm[round][msg.sender].push(_num);

    // if (revealCount[round] == TICKET_TOTAL) {
    //   nextTerm();
    //   drawWinner();
    // }
  }

  function drawWinner () public payable/*onlyOwner*/ {
    require(term == Term.RESULT);
    uint seedIndex = uint(seed[round]) % TICKET_TOTAL;
    while (numToAddr[round][seedIndex] == address(0)) {
      seedIndex++;
      if (seedIndex > TICKET_TOTAL) {
        seedIndex = 0;
      }
    }
    winner[round] = numToAddr[round][seedIndex];
    owner().transfer(address(this).balance / 3);
    winner[round].transfer(address(this).balance);
  }

  function getSeedIndex () public {
    uint seedIndex = uint(seed[round]) % TICKET_TOTAL;
    if (numToAddr[round][seedIndex] == address(0)) {
      seedIndex++;
      if (seedIndex > TICKET_TOTAL) {
        seedIndex = 0;
      }
    }
  }

  function getIntroducedCount(address _user) public view returns (uint) {
    return introducers[_user];
  }

  function getRound() public view returns (uint) {
    return round;
  }

  function getBuyCount() public view returns (uint) {
    return buyCount[round];
  }

  function getRevealCount() public view returns (uint) {
    return revealCount[round];
  }

  function getAddress(uint _num) public view returns (address) {
    return numToAddr[round][_num];
  }

  function getNumbersOnBuyTerm(address _address) public view returns (uint[] memory) {
    return addrToNumsOnBuyTerm[round][_address];
  }

  function getNumbersOnRevealTerm(address _address) public view returns (uint[] memory) {
    return addrToNumsOnRevealTerm[round][_address];
  }

  function nextTerm() public /* onlyOwner */ {
    require(term == Term.BUY || term == Term.REVEAL);
    if (term == Term.BUY) {
      term = Term.REVEAL;
    } else if (term == Term.REVEAL) {
      term = Term.RESULT;
      drawWinner();
    } else {
      // nothing
    }
  }

  function getTerm() public view returns (Term) {
    return term;
  }

  function getWinner() public view returns (address) {
    return winner[round];
  }

  /// @param _from more than equals
  /// @param _to less than equals
  function getSelectableNumbers(uint _from, uint _to) public view returns (uint[] memory) {
    require(_from < _to);
    uint diff = getEmptyNumber(_from, _to);
    uint i = 0;
    uint[] memory numbers = new uint[](diff);
    for (uint target = _from; target <= _to; target++) {
      if (commitments[round][target][0] == 0) {
        numbers[i] = target;
        i++;
      }
    }
    return numbers;
  }

  /// @param _from more than equals
  /// @param _to less than equals
  function getNonSelectableNumbers(uint _from, uint _to) public view returns (uint[] memory) {
    require(_from < _to);
    uint diff = _to - _from - getEmptyNumber(_from, _to) + 1;
    uint i = 0;
    uint[] memory numbers = new uint[](diff);
    for (uint target = _from; target <= _to; target++) {
      if (commitments[round][target][0] != 0) {
        numbers[i] = target;
        i++;
      }
    }
    return numbers;
  }

  function getEmptyNumber(uint _from, uint _to) private view returns (uint) {
    uint diff = 0;
    for (uint target = _from; target <= _to; target++) {
      if (commitments[round][target][0] == 0) {
        diff++;
      }
    }
    return diff;
  }

  function nextGame () public /* onlyOwner */ {
    require(term == Term.RESULT);
    round++;
    term = Term.BUY;
  }

  function setPrice (uint price) public {
    TICKET_PRICE = price;
  }

  function getPrice () public view returns (uint) {
    return TICKET_PRICE;
  }

  function setTicketTotal (uint num) public /* onlyOwner */ {
    // For Only Test
    TICKET_TOTAL = num;
  }

  function getContractBalance() public view returns (uint) {
    return address(this).balance;
  }

  function getBlocktime() public view returns (uint256) {
    return block.timestamp;
  }

  function timepolling() public {
    uint256 _now = block.timestamp;
    if (term == Term.BUY) {
      if (_now > buyEndTime[round]) {
        if (TICKET_TOTAL == buyCount[round]) {
          term = Term.REVEAL;
        } else {
          buyEndTime[round] += 2 * 24 * 60 * 60;
          revealEndTime[round] += 2 * 24 * 60 * 60;
        }
      return;
      }
      // else:Nothing
    } else if (term == Term.REVEAL) {
      if (_now > revealEndTime[round]) {
        term = Term.RESULT;
        return;
      }
      // else:Nothing
    }
  }
}