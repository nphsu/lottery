const contract = artifacts.require("DreamTicket");

module.exports = function(deployer) {
  const ticketTotal = 4000
  deployer.deploy(contract, ticketTotal)
};
