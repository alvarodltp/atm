import React from 'react';
import '../App.css';
import AtmContainer from './AtmContainer/AtmContainer'
import toFixed from './Number'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      transactions: null,
      allExpenses: null,
      selectedTransactions: null,
      balance: 2000,
      withdrawValue: "",
      error: "",
      paginationArr: null,
      paginationStyle: null,
      currentPageNumber: "",
      pageName: "",
      data: null
    }
  }

  componentDidMount(){
    this.getTransactions();
  }

  getTransactions = () => {
    fetch("https://app.fakejson.com/q/0Pm3bJKu?token=HbqwPS-BSqOehLpig2ePqg")
    .then(response => response.json())
    .then(json => {
      let allExpenses = json.transactions.map(t => t.amount).reduce((a, b) => a + b, 0);
      let expensePercent = toFixed((allExpenses * 100) / this.state.balance, 2);
      let balance = toFixed(this.state.balance - allExpenses, 2);
      let balancePercent = toFixed((balance * 100) / this.state.balance, 2);
      //determines the number of pages needed for pagination
      let paginationNumber = Math.ceil(json.transactions.length / 5); 
      //creates an array with the number of pages needed starting at 1
      let paginationArr = [...Array(paginationNumber+1).keys()].slice(1); 
      let selectedTransactions = json.transactions.slice(0, 5); 
      let data = [{ name: "Expenses", value: Number(expensePercent) }, { name: "Remaining Balance", value: Number(balancePercent) }];
      
      this.setState({
        allExpenses: allExpenses,
        transactions: json.transactions,
        selectedTransactions: selectedTransactions,
        balance: balance,
        paginationArr: paginationArr,
        data: data
      });
    })
  }

  handleChange = (e) => {
    this.setState({
      withdrawValue: e.target.value
    });
  }

  withdraw = () => {
    const { withdrawValue, balance } = this.state
    let transactions = [...this.state.transactions];
    let error;
    let newBalance;
    let allExpenses;
    if(withdrawValue <= 0 || withdrawValue === ""){
      error = "Withdrawal amount must be a at least $20.00."
      newBalance = toFixed(balance, 2)
    } else if (withdrawValue != 20){
      error = "You can only withdraw in increments of $20.00."
      newBalance = toFixed(balance, 2)
    } else if (withdrawValue > balance){
      error = "You don't have enough funds."
      newBalance = toFixed(balance, 2)
    } else {
      newBalance = toFixed(balance - withdrawValue, 2)
      transactions.unshift({name: "Withdrawal", amount: withdrawValue})
      //adds all the transactions together so the pie chart can be updated with every withdraw
      allExpenses = transactions.map(t => t.amount).reduce((a, b) => a + b, 0);
    }  
    this.setState({
      balance: newBalance,
      withdrawValue: "",
      error: error,
      transactions: transactions,
      allExpenses: allExpenses
    }, this.addTransactionToList(transactions));
  }

  addTransactionToList = (transactions) => {
    let selectedTransactions = transactions.slice(0, 5); 
    let paginationNumber = Math.ceil(transactions.length / 5);
    let paginationArr = [...Array(paginationNumber+1).keys()].slice(1);
    this.setState({
      selectedTransactions: selectedTransactions,
      paginationNumber: paginationNumber,
      paginationArr: paginationArr
    })
  }

  handlePagination = (page) => {
    let transactions = [...this.state.transactions]
    let toPost = page * 5;
    let fromPost = toPost - 5;
    let selectedTransactions = transactions.slice(fromPost, toPost);
    this.setState({
      selectedTransactions: selectedTransactions,
      currentPageNumber: page,
      paginationStyle: {color: '#F10270', borderBottom: '3px solid #F10270'}
    });
  }

  handlePageChange = (pageName) => {
    this.setState({
      pageName: pageName
    });
  }

  render(){
    const { 
      transactions, 
      balance,
      withdrawValue, 
      error, 
      paginationArr, 
      selectedTransactions, 
      paginationStyle, 
      currentPageNumber, 
      pageName,
      data
    } = this.state

    return (
      <React.Fragment>
        {transactions && 
        <AtmContainer data={data} currentPageNumber={currentPageNumber} paginationStyle={paginationStyle} handlePagination={this.handlePagination} paginationArr={paginationArr} error={error} withdraw={this.withdraw} withdrawValue={withdrawValue} balance={balance} selectedTransactions={selectedTransactions} handleChange={this.handleChange} handlePageChange={this.handlePageChange} pageName={pageName}/> }
      </React.Fragment>
    );
  }
}

export default App;
