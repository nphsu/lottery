const contract = artifacts.require("SecondDream");

module.exports = function(deployer) {
  const ticketTotal = 4000
  deployer.deploy(contract, ticketTotal)
};
