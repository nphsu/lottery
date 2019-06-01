pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

contract LuckeyLottery {

  struct Entry {
    address buyer;
    uint quantity;
  }

  uint private lotteryPrice = 1e15;
  uint private totalQuantity;
  Entry[] private entries;

  function setPrice (uint price) public {
    lotteryPrice = price;
  }

  function getPrice () public view returns (uint) {
    return lotteryPrice;
  }

  function buy () public payable {
    require(msg.value % lotteryPrice == 0);

    uint quantity = msg.value / lotteryPrice;
    totalQuantity += quantity;

    Entry memory entry = Entry(msg.sender, quantity);
    entries.push(entry);
  }

  function getTotalQuantity () public view returns (uint) {
    return totalQuantity;
  }

  function getEntries () public view returns (Entry[] memory) {
    return entries;
  }
}