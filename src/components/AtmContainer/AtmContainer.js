import React from 'react';
import Amount from '../Amount/Amount';
import Withdraw from '../Withdraw/Withdraw';
import RecentTransactions from '../RecentTransactions/RecentTransactions';
import Pagination from '../Pagination/Pagination';

class AtmContainer extends React.Component {
  constructor(){
    super()
    this.state = {
    }
  }

  render(){
    return (
      <React.Fragment>
        <Amount />
        <Withdraw />
        <RecentTransactions transactions={this.props.transactions} />
        <Pagination />
      </React.Fragment>
    );
  }
}

export default AtmContainer;