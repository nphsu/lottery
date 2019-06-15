const contract = artifacts.require("DreamTicket");

module.exports = function(deployer) {
  deployer.deploy(contract);
};
