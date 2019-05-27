pragma solidity >=0.4.21 <0.6.0;

contract ContinuousLottery {
  struct Round {
    uint endBlock;
    uint drawBlock;
    Entry[] entries;
    uint totalQuantity;
    address winner;
  }
  struct Entry {
    address buyer;
    uint quantity;
  }
  uint constant public TICKET_PRICE = 1e15;

  mapping(uint => Round) public rounds;
  uint public round;
  uint public duration;
  mapping (address => uint) public balances;

  constructor (uint _duration) public {
    duration = _duration;
    round = 1;
    rounds[round].endBlock = block.number + duration;
    rounds[round].drawBlock = block.number + duration + 5;
  }

  function buy () payable public {
    require(msg.value % TICKET_PRICE == 0);

    if (block.number > rounds[round].endBlock) {
      round += 1;
      rounds[round].endBlock = block.number + duration;
      rounds[round].drawBlock = block.number + duration + 5;
    }

    uint quantity = msg.value / TICKET_PRICE;
    Entry memory entry = Entry(msg.sender, quantity);
    rounds[round].entries.push(entry);
    rounds[round].totalQuantity += quantity;
  }

  function drawWinner (uint roundNumber) public {
    Round storage drawing = rounds[roundNumber];
    require(drawing.winner == address(0));
    require(block.number > drawing.drawBlock);
    require(drawing.entries.length > 0);

    bytes32 blockhash32 = blockhash(block.number -1);
    bytes memory blockhash = toBytes(blockhash32);
    bytes32 rand = keccak256(blockhash);
    uint counter = uint(rand) % drawing.totalQuantity;
    for (uint i=0; i < drawing.entries.length; i++) {
      uint quantity = drawing.entries[i].quantity;
      if (quantity > counter) {
        drawing.winner = drawing.entries[i].buyer;
        break;
      }
      else {
        counter -= quantity;
      }
    }
    balances[drawing.winner] += TICKET_PRICE * drawing.totalQuantity;
  }

  function withdraw () public {
    uint amount = balances[msg.sender];
    balances[msg.sender] = 0;
    msg.sender.transfer(amount);
  }

  function deleteRound (uint _round) public {
    require(block.number > rounds[_round].drawBlock + 100);
    require(rounds[_round].winner != address(0));
    delete rounds[_round];
  }

  function () payable external {
    buy();
  }

  function toBytes(bytes32 _data) public pure returns (bytes memory) {
    return abi.encodePacked(_data);
  }
}