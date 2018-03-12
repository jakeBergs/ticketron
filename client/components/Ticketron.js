import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import { fetchAccounts } from '../store/accounts'
import axios from 'axios'

export class Ticketron extends Component {
  constructor() {
    super()

    this.state = {
      price: 0,
      event: '',
      ticketsAvailable: 0,
      used: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUse = this.handleUse.bind(this);
  }

  componentDidMount() {
    this.props.fetchAccounts()
    console.log('sup')

    let price, event, ticketsAvailable;

    axios.get('/api/eth/price')
      .then(res => res.data)
      .then(p => {
        price = p;
        return axios.get('/api/eth/ticket/count')
      })
      .then(res => res.data)
      .then(ta => {
        ticketsAvailable = ta;
        return axios.get('/api/eth/event')
      })
      .then(res => res.data)
      .then(ev => {
        event = ev;
        this.setState({ price, event, ticketsAvailable });
      })
  }

  handleUse(ev) {
    ev.preventDefault()

    if (this.state.used) window.alert('No ticket with that hash is available for this user')
    else {
      window.alert('Ticket was used successfully!')
      this.setState({used: true})
    }
  }

  handleSubmit(event, inp) {
    event.preventDefault();
    const account = event.target.account.value
    console.log('account---', account)

    axios.post('/api/eth/ticket/buy', {buyer: account, value: this.state.price})
      .then(res => res.data)
      .then(ticket => {
        window.alert(ticket);
        const ticketsAvailable = this.state.ticketsAvailable - 1;
        this.setState({ticketsAvailable})
      })
      .catch(console.error)
  }

  render() {
    const accounts = this.props.accounts;
    return (
      <div>
        <h1>Ticketron2.0</h1>
        <h2>{this.state.event}</h2>
        <div>
          <p>Ticket Price: <span>{this.state.price}</span></p>
          <p>Tickets Reamaining: <span>{this.state.ticketsAvailable}</span></p>
          {
            accounts.length ? (
              <Form onSubmit={this.handleSubmit}>
                <Form.Group widths='equal'>
                  <Form.Field name="account" label="Account" control="select">
                    {
                      accounts.map(account => {
                        return (
                          <option key={account} value={account}>{account}</option>
                        )
                      })
                    }
                  </Form.Field>
                  <Form.Field name="ticket" label='ticket' control='input' />
                </Form.Group>
                <Form.Group>

                  <div>
                    <Button name="buyButton" content="Buy Ticket" positive />
                  </div>
                </Form.Group>
              </Form>
            ) : <p>Could not Find any accounts</p>
          }


          <Button name="useButton" content="Use Ticket" onClick={this.handleUse} secondary />
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    accounts: state.accounts
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAccounts() {
      dispatch(fetchAccounts())
    }
  }
}

export default connect(mapState, mapDispatch)(Ticketron)
