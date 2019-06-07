const contract = artifacts.require("LuckeyLottery");

module.exports = function(deployer) {
  deployer.deploy(contract, 10);
};
