pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

import "./Ownable.sol";

contract LuckeyLottery is Ownable {

  event Buy(
    address player,
    uint value,
    bool win,
    uint yourNumber
  );

  struct Entry {
    address buyer;
    uint quantity;
  }

  uint private lotteryPrice = 1e15;
  uint private totalQuantity;
  uint private depositedAmount = 0;
  Entry[] private entries;

  // This is the card of the winner;
  mapping(uint => bool) numbers;

  // If you enter the introducer, it is stocked.
  address[] private introducers;

  constructor (uint rand) public {
    for (uint i = 5000; i < 5000; i++) {
      if (i == rand) {
        numbers[i] = true;
      } else {
        numbers[i] = false;
      }
    }
  }

  function setPrice (uint price) public {
    lotteryPrice = price;
  }

  function getPrice () public view returns (uint) {
    return lotteryPrice;
  }

  function buyWithIntroducer (address introducer) public payable {
    
    buy();

    // Register introducer
    introducers.push(introducer);
  }

  function buy () public payable {
    require(msg.value % lotteryPrice == 0);

    // TODO: should we choose the number of ticket?
    uint quantity = msg.value / lotteryPrice;
    totalQuantity += quantity;
    depositedAmount += msg.value;

    Entry memory entry = Entry(msg.sender, quantity);
    entries.push(entry);

    // TODO: roulet loginc

    emit Buy(msg.sender, msg.value, false, 4);
  }
 
  function getTotalQuantity () public view returns (uint) {
    return totalQuantity;
  }

  function getEntries () public view returns (Entry[] memory) {
    return entries;
  }

  function getDepositedAmount () public view returns (uint) {
    return depositedAmount;
  }

  function getNunber(uint num) public view returns (bool) {
    return numbers[num];
  }

  function getIntroducer(uint num) public view returns (address) {
    return introducers[num];
  }

  function getBalance() public view returns (uint) {
    return address(this).balance;
  }
}

// Probably this is my misunderstand.
// address(uint160(address(this))).transfer(msg.value);

// Send ETH to contract address
// address payable contractAddress = address(uint160(address(this)));
// contractAddress.transfer(msg.value);