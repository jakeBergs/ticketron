const contract = require('truffle-contract');

const ticketron_artifact = require('../build/contracts/Ticketron.json');
const Ticketron = contract(ticketron_artifact);

module.exports = {
  fetchAccounts: function(callback) {
    let self = this;

    Ticketron.setProvider(self.web3.currentProvider);

    self.web3.eth.getAccounts((err, accounts) => {
      if (err !== null) {
        console.error(err);
        return;
      }
      if (accounts.length == 0) {
        console.log('Could not get any accounts!');
        return;
      }

      self.accounts = accounts;

      callback(self.accounts);
    })
  },
  getPrice: function(callback) {
    let self = this;
    Ticketron.setProvider(self.web3.currentProvider);

    Ticketron.deployed().then(instance => {
      return instance.getPrice()
    }).then(price => {
      callback(price)
    })

  },
  getRemainingTickets: function(callback) {
    Ticketron.setProvider(this.web3.currentProvider);

    Ticketron.deployed().then(instance => {
      return instance.getTicketsRemaining()
    }).then(ticketCount => {
      callback(ticketCount)
    })
  },
  buyTicket: function(buyer, value, callback) {
    Ticketron.setProvider(this.web3.currentProvider);

    Ticketron.deployed().then(instance => {
      return instance.buyTicket({from: buyer})
    }).then(ticket => {
      callback(ticket)
    })
    .catch(console.error);
  }
};
