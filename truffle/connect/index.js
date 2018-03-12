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
      return instance.getPrice.call()
    }).then(price => {
      callback(price)
    })
  },
  getOwner: function(callback) {
    let self = this;
    Ticketron.setProvider(self.web3.currentProvider);

    Ticketron.deployed().then(instance => {
      return instance.getOwner()
    }).then(owner => {
      callback(owner)
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
  getEventName: function(callback) {
    Ticketron.setProvider(this.web3.currentProvider);

    Ticketron.deployed().then(instance => {
      return instance.getEventName()
    }).then(event => {
      callback(event)
    })
  },
  buyTicket: function(buyer, value, callback) {
    Ticketron.setProvider(this.web3.currentProvider);

    Ticketron.deployed().then(instance => {
      return instance.buyTicket.sendTransaction({from: buyer, value})
    }).then(ticket => {
      callback(ticket)
    })
    .catch(console.error);
  },
  useTicket: function(sender, key, callback) {
    Ticketron.setProvider(this.web3.currentProvider);
    console.log(sender)
    console.log(key)
    Ticketron.deployed().then(instance => {
      return instance.useTicket(key, {from: sender})
    }).then((valid) => {callback(valid ? 'ticket is good' : 'ticket not valid')})
    .catch(err => {
      console.error(err);
      callback(err)
    })
  },
  getTicket: function(key, callback) {
    Ticketron.setProvider(this.web3.currentProvider);
    console.log(key)
    Ticketron.deployed().then(instance => {
      return instance.getTicket(key)
    }).then(ticket => {
      callback(ticket)
    })
    .catch(console.error)
  }
};
