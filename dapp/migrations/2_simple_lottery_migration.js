var fs = require('fs');
var SimpleLottery = artifacts.require("SimpleLottery");

module.exports = function(deployer, network) {

  // if (network == "")

  // var duration = 3600 * 24 * 3
  var duration = 60
  deployer.deploy(SimpleLottery, duration)
}