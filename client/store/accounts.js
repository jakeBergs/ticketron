import axios from 'axios';

const GET_ACCOUNTS = 'GET_ACCOUNTS';

const getAccounts = accounts => {return {type: GET_ACCOUNTS, accounts}}

export default function (state = [], action) {
  switch (action.type) {
    case GET_ACCOUNTS:
      return action.accounts
    default:
      return state
  }
}

export const fetchAccounts = () => (dispatch) => {
  axios.get('/api/eth/accounts')
    .then(res => res.data)
    .then(accounts => {
      dispatch(getAccounts(accounts))
    })
    .catch(console.error)
}
