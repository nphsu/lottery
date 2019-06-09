const contract = artifacts.require("DreamTickets");

module.exports = function(deployer) {
  deployer.deploy(contract);
};
