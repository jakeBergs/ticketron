var Ticketron = artifacts.require("../contracts/Ticketron.sol");

// args
const eventName = 'Concert';
const capacity = 100;
const price = 2000000000000000; // in wei (= 10^-18 eth), 2e-3 eth
module.exports = function(deployer) {
  deployer.deploy(Ticketron, eventName, price, capacity);
};
