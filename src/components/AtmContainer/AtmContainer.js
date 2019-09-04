import React from 'react';
import Amount from '../Amount/Amount';
import Withdraw from '../Withdraw/Withdraw';
import RecentTransactions from '../RecentTransactions/RecentTransactions';
import Pagination from '../Pagination/Pagination';

const AtmContainer = (props) => {
  return (
    <React.Fragment>
      <h1 style={{padding: "10px", fontSize: "40px", margin: "0"}}>ATM</h1>
      <Amount balance={props.balance}/>
      <Withdraw error={props.error} withdraw={props.withdraw} handleChange={props.handleChange} withdrawValue={props.withdrawValue}/>
      <RecentTransactions transactions={props.transactions} />
      <Pagination />
    </React.Fragment>
  );
}


export default AtmContainer;