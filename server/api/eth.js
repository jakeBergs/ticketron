const router = require('express').Router()

const truffleConnect = require('../../truffle/connect')

module.exports = router;

router.get('/accounts', (req, res, next) => {
  console.log('----- Getting Accounts -------')
  // console.log('-----------_-_-_____', truffleConnect)
  truffleConnect.fetchAccounts(accts => {
    console.log(accts)
    res.json(accts);
  })
  // .catch(next)
})

router.get('/price', (req, res, next) => {
  console.log('------ Getting Price ------');

  truffleConnect.getPrice(price => {
    console.log(price);
    res.json(price);
  })
})

router.get('/ticket/count', (req, res, next) => {
  console.log('------ Getting Ticket Count ------');

  truffleConnect.getRemainingTickets(ticketCount => {
    console.log(ticketCount);
    res.json(ticketCount);
  })
})

router.post('/ticket/buy', (req, res, next) => {
  console.log('------ Buying Ticket ------');
  const buyer = req.body.buyer;
  const value = req.body.value;

  truffleConnect.buyTicket((buyer, value, (ticket) => {
    console.log(ticket);
    res.json(ticket);
  }))
})
