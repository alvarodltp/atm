import React from 'react';
import './App.css';
import AtmDashboard from './AtmDashboard/AtmDashboard';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      transactions: null,
      transactionsCopy: null,
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
      filter: ""
    }
  }

  componentDidMount(){
    this.getTransactions();
  }

  getTransactions = () => {
    fetch("https://app.fakejson.com/q/0Pm3bJKu?token=HbqwPS-BSqOehLpig2ePqg")
    .then((response) => {
      console.log(response)
      response.json()
      .then((json) => {
        const allExpenses = json.transactions.map(t => t.amount).reduce((a, b) => a + b, 0);
        const newBalance = Number(this.state.startingBalance - allExpenses).toFixed(2);
        this.setPaginationData(json.transactions);
        this.setExpenseData(allExpenses, newBalance);
        this.setState({
          transactions: json.transactions,
          transactionsCopy: json.transactions,
          newBalance: newBalance,
          allExpenses: allExpenses
        });
      })
    })
  }

  setExpenseData = (allExpenses, newBalance) => {
    const expensePercent = ((allExpenses * 100) / 2000).toFixed(2);
    const balancePercent = ((newBalance * 100) / 2000).toFixed(2);
    const data = [{ name: "Expenses", value: Number(expensePercent) }, { name: "Balance", value: Number(balancePercent)}];
    this.setState({
      data: data
    });
  }

  setPaginationData = (transactions) => {
    //determines the number of pages needed for pagination
    const paginationNumber = Math.ceil(transactions.length / 5); 
    //creates an array with the number of pages needed starting at 1
    const paginationArr = [...Array(paginationNumber+1).keys()].slice(1); 
    const selectedTransactions = transactions.slice(0, 5); 
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
    const transactions = [...this.state.transactions];
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
      transactions.unshift({amount: Number(withdrawValue), name: "Withdrawal"})
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
      }, this.addTransactionToList(transactions), this.setExpenseData(allExpenses, balance), this.scrollToBottom());
    } 
  }

  addTransactionToList = (transactions) => {
    const selectedTransactions = transactions.slice(0, 5); 
    const paginationNumber = Math.ceil(transactions.length / 5);
    const paginationArr = [...Array(paginationNumber+1).keys()].slice(1);
    this.setState({
      selectedTransactions: selectedTransactions,
      paginationNumber: paginationNumber,
      paginationArr: paginationArr
    });
  }

  handlePagination = (page) => {
    const transactions = [...this.state.transactionsCopy];
    const toPost = page * 5;
    const fromPost = toPost - 5;
    const selectedTransactions = transactions.slice(fromPost, toPost);
    this.setState({
      selectedTransactions: selectedTransactions,
      currentPageNumber: page,
      paginationStyle: {color: '#F10270', borderBottom: '3px solid #F10270'}
    });
  }

  handlePageChange = (pageName) => {
    this.setState({
      pageName: pageName
    }, () => this.scrollToBottom())
  }

  handleFilter = (data) => {
    const transactions = [...this.state.transactions];
    const transactionsCopy = [...this.state.transactionsCopy]
    let filteredTransaction;

    if (data.value === "ascending"){
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

  scrollToBottom = () => {
    window.scrollTo(0, 2000)
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
        <AtmDashboard filter={filter} handleFilter={this.handleFilter} data={data} currentPageNumber={currentPageNumber} paginationStyle={paginationStyle} handlePagination={this.handlePagination} paginationArr={paginationArr} error={error} withdraw={this.withdraw} withdrawValue={withdrawValue} newBalance={newBalance} selectedTransactions={selectedTransactions} handleChange={this.handleChange} handlePageChange={this.handlePageChange} pageName={pageName}/> }
      </div>
    );
  }
}

export default App;

