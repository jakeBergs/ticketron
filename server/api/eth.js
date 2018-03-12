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

router.get('/owner', (req, res, next) => {
  console.log('------ Getting Owner ------');

  truffleConnect.getOwner(owner => {
    console.log(owner);
    res.json(owner);
  })
})

router.get('/event', (req, res, next) => {
  console.log('------ Getting EventName ------');

  truffleConnect.getEventName(event => {
    console.log(event);
    res.json(event);
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
  console.log(buyer)
  truffleConnect.buyTicket(buyer, value, (ticket) => {
    console.log(ticket);
    res.json(ticket);
  })
})

router.post('/ticket/use', (req, res, next) => {
  console.log('------ Using Ticket -------');
  const ticket = req.body.ticket;
  const user = req.body.user;

  truffleConnect.useTicket(user, ticket, (message) => {
    res.send(message)
  })
})

router.get('/ticket/:key', (req, res, next) => {
  console.log('------ checking Ticket -------');
  const key = req.params.key;

  truffleConnect.getTicket(key, (ticket) => {
    console.log(ticket)
    res.json(ticket)
  })
})
