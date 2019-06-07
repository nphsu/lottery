pragma solidity >=0.4.21 <0.6.0;

contract SecondDream {

  event Challenge(
    address player
  );

  // mapping(address => string)

  address[] private applicants;


  /**
   * It doesn't decide who is winner.
   */
  function challenge() public payable {
    // validate
    applicants.push(msg.sender);
    emit Challenge(msg.sender);
  }

  function getApplicants() public view returns (address[] memory) {
    return applicants;
  }

  function decideWinner() public {
    // only owner

    // devide logic
    bytes32 rand = getRand();
    uint randInt = uint(rand);
    string memory judge = judge(rand);

    // init applicants
    applicants.length = 0;
  }

  function getRand () private view returns (bytes32) {
    bytes32 blockhash32 = blockhash(block.number - 1);
    bytes memory blockhashbyte = toBytes(blockhash32);
    bytes32 rand = keccak256(blockhashbyte);
    return rand;
  }

  function judge (bytes32 rand) private pure returns (string memory) {
    uint randInt = uint(rand) % 100;
    uint8[3] memory probabilities = [60, 30, 10];
    string[3] memory rewards = ["A", "B", "C"];

    uint tempSum = 0;
    for (uint8 i = 0; i < probabilities.length; i++) {
      tempSum += probabilities[i];
      if (randInt < tempSum) {
        return rewards[i];
      }
    }
  }

  function toBytes(bytes32 _data) public pure returns (bytes memory) {
    return abi.encodePacked(_data);
  }
}