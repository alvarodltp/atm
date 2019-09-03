import React from 'react';
import '../App.css';
import AtmContainer from './AtmContainer/AtmContainer'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      transactions: null
    }
  }

  componentDidMount(){
    this.getTransactions();
  }

  getTransactions = () => {
    fetch("https://app.fakejson.com/q/0Pm3bJKu?token=HbqwPS-BSqOehLpig2ePqg")
    .then(response => response.json())
    .then(json => {
      this.setState({
        transactions: json.transactions
      });
    })
  }

  render(){
    const { transactions } = this.state
    return (
      <div>
        {transactions && <AtmContainer transactions={transactions}/> }
      </div>
    );
  }
}

export default App;
