pragma solidity >=0.4.21 <0.6.0;

contract SimpleLottery {
  uint public constant TICKET_PRICE = 1e16; // 0.01 ether

  address[] public tickets;
  address public winner;
  uint public ticketingCloses;
  string name = "SimpleLottery";

  constructor (uint duration) public {
    ticketingCloses = now + duration;
  }

  function getName() public view returns (string memory) {
    return name;
  }

  function getRand () public view returns (bytes32) {
    bytes32 blockhash32 = blockhash(block.number -1);
    bytes memory blockhash = toBytes(blockhash32);
    bytes32 rand = keccak256(blockhash);
    return rand;
  }

  function buy () public payable {
    require(msg.value == TICKET_PRICE);
    require(now < ticketingCloses);

    tickets.push(msg.sender);
  }

  function drawWinner () public {
    require(now > ticketingCloses + 5 minutes);
    require(winner == address(0));

    bytes32 blockhash32 = blockhash(block.number -1);
    bytes memory blockhash = toBytes(blockhash32);
    bytes32 rand = keccak256(blockhash);
    winner = tickets[uint(rand) % tickets.length];
  }

  function withdraw () public {
    require(msg.sender == winner);
    msg.sender.transfer(address(this).balance);
  }

  function () payable external {
    buy();
  }

  function toBytes(bytes32 _data) public pure returns (bytes memory) {
    return abi.encodePacked(_data);
  }
}