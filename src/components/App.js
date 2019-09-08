import React from 'react';
import '../App.css';
import AtmContainer from './AtmContainer/AtmContainer';
import toFixed from './Number';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      transactions: null,
      transactionsCopy: null,
      allExpenses: null,
      selectedTransactions: null,
      startingBalance: 2000,
      newBalance: null,
      withdrawValue: "",
      error: "",
      paginationArr: null,
      paginationStyle: null,
      currentPageNumber: "",
      pageName: "Recent Transactions",
      data: [],
      filter: "all"
    }
  }

  componentDidMount(){
    this.getTransactions();
  }

  getTransactions = () => {
    fetch("https://app.fakejson.com/q/0Pm3bJKu?token=HbqwPS-BSqOehLpig2ePqg")
    .then((response) => {
      response.json()
      .then((json) => {
        let allExpenses = json.transactions.map(t => t.amount).reduce((a, b) => a + b, 0);
        let newBalance = Number(this.state.startingBalance - allExpenses).toFixed(2);
        this.setPaginationData(json.transactions);
        this.setExpenseData(allExpenses, newBalance);
        this.setState({
          transactions: json.transactions,
          transactionsCopy: json.transactions,
          newBalance: newBalance
        });
      })
    })
  }

  setExpenseData = (allExpenses, newBalance) => {
    let expensePercent = ((allExpenses * 100) / 2000).toFixed(2);
    let balancePercent = ((newBalance * 100) / 2000).toFixed(2);
    let data = [{ name: "Expenses", value: Number(expensePercent) }, { name: "Remaining Balance", value: Number(balancePercent) }];
    this.setState({
      data: data
    });
  }

  setPaginationData = (transactions) => {
    //determines the number of pages needed for pagination
    let paginationNumber = Math.ceil(transactions.length / 5); 
    //creates an array with the number of pages needed starting at 1
    let paginationArr = [...Array(paginationNumber+1).keys()].slice(1); 
    let selectedTransactions = transactions.slice(0, 5); 
    this.setState({
      selectedTransactions: selectedTransactions,
      paginationArr: paginationArr
    });
  }

  handleChange = (e) => {
    this.setState({
      withdrawValue: e.target.value
    });
  }

  withdraw = () => {
    const { withdrawValue, newBalance } = this.state;
    let transactions = [...this.state.transactions];
    let error;
    let balance;
    let allExpenses;

     if (Number(withdrawValue) > Number(newBalance)){
      error = "You don't have enough funds."
      balance = Number(newBalance).toFixed(2);
      this.setState({ newBalance: balance, error: error });
    } else if (withdrawValue <= 0 || withdrawValue === ""){
      error = "Withdrawal amount must be at least $20.00."
      balance = Number(newBalance).toFixed(2);
      this.setState({ newBalance: balance, error: error });
    } else if (withdrawValue % 20 !== 0){
      error = "You can only withdraw in increments of $20.00."
      balance = Number(newBalance).toFixed(2);
      this.setState({ newBalance: balance, error: error });
    } else {
      transactions.unshift({name: "Withdrawal", amount: Number(withdrawValue)})
      allExpenses = transactions.map(t => t.amount).reduce((a, b) => a + b, 0);
      balance = Number(newBalance - withdrawValue).toFixed(2);
      this.handlePagination(1);
      this.setState({
        error: "",
        withdrawValue: "",
        newBalance: balance,
        startingBalance: balance,
        transactions: transactions,
        transactionsCopy: transactions,
        filter: "all"
      }, this.addTransactionToList(transactions), this.setExpenseData(allExpenses, balance));
    } 
  }

  addTransactionToList = (transactions) => {
    let selectedTransactions = transactions.slice(0, 5); 
    let paginationNumber = Math.ceil(transactions.length / 5);
    let paginationArr = [...Array(paginationNumber+1).keys()].slice(1);
    this.setState({
      selectedTransactions: selectedTransactions,
      paginationNumber: paginationNumber,
      paginationArr: paginationArr
    });
  }

  handlePagination = (page) => {
    let transactions = [...this.state.transactionsCopy];
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
    this.setState({pageName: pageName});
  }

  handleFilter = (data) => {
    let transactions = [...this.state.transactions];
    let transactionsCopy = [...this.state.transactionsCopy]
    let filteredTransaction;

    if(data.value === "ascending"){
      filteredTransaction = transactionsCopy.sort((a, b) => a.amount - b.amount);
      this.setPaginationData(filteredTransaction);
    } else if (data.value === "descending"){
      filteredTransaction = transactionsCopy.sort((a, b) => b.amount - a.amount);
      this.setPaginationData(filteredTransaction);
    } else {
      filteredTransaction = transactions;
      this.setPaginationData(transactions);
    }

    this.setState({
      filter: data.value,
      transactionsCopy: filteredTransaction
    }, () => this.handlePagination(1));
  }  

  render(){
    const { 
      transactions, 
      newBalance,
      withdrawValue, 
      error, 
      paginationArr, 
      selectedTransactions, 
      paginationStyle, 
      currentPageNumber, 
      pageName,
      data,
      filter
    } = this.state;

    return (
      <div className="App">
        {transactions && 
        <AtmContainer scrollToBottom={this.scrollToBottom} filter={filter} handleFilter={this.handleFilter} data={data} currentPageNumber={currentPageNumber} paginationStyle={paginationStyle} handlePagination={this.handlePagination} paginationArr={paginationArr} error={error} withdraw={this.withdraw} withdrawValue={withdrawValue} newBalance={newBalance} selectedTransactions={selectedTransactions} handleChange={this.handleChange} handlePageChange={this.handlePageChange} pageName={pageName}/> }
      </div>
    );
  }
}

export default App;

