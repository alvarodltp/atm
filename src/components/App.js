import React from 'react';
import '../App.css';
import AtmContainer from './AtmContainer/AtmContainer'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      transactions: null,
      balalance: 2000,
      withdrawValue: "",
      error: "",
      paginationArr: null
    }
  }

  componentDidMount(){
    this.getTransactions();
  }

  getTransactions = () => {
    fetch("https://app.fakejson.com/q/0Pm3bJKu?token=HbqwPS-BSqOehLpig2ePqg")
    .then(response => response.json())
    .then(json => {
      let amountArr = json.transactions.map(transaction => transaction.amount);
      let initialBalance = amountArr.reduce((a, b) => a + b, 0);
      let paginationNumber = Math.ceil(json.transactions.length / 5);
      let paginationArr = [...Array(paginationNumber+1).keys()].slice(1);
      debugger
      this.setState({
        transactions: json.transactions,
        balance: initialBalance,
        pagination: paginationArr
      });
    })
  }

  handleChange = (e) => {
    this.setState({
      withdrawValue: e.target.value
    });
  }

  withdraw = () => {
    let withdrawValue = this.state.withdrawValue;
    let balance = this.state.balance;
    let error;
    let newBalance;
    if(withdrawValue <= 0){
      error = "Withdrawal amount must be a at least $20.00."
      newBalance = balance
    } else if (withdrawValue > balance){
      error = "You don't have enough funds."
      newBalance = balance
    } else if (withdrawValue != 20){
      error = "You can only withdraw in increments of $20.00."
      newBalance = balance
    } else {
      newBalance = balance - withdrawValue
    }  
    this.setState({
      balance: newBalance,
      withdrawValue: "",
      error: error
    });
  }

  render(){
    const { transactions, balance, withdrawValue, error, paginationArr } = this.state
    return (
      <div>
        {transactions && 
        <AtmContainer paginationArr={paginationArr} error={error} withdraw={this.withdraw} withdrawValue={withdrawValue} balance={balance} transactions={transactions} handleChange={this.handleChange} /> }
      </div>
    );
  }
}

export default App;
