import React from 'react';
import Amount from '../Amount/Amount';
import Withdraw from '../Withdraw/Withdraw';
import RecentTransactions from '../RecentTransactions/RecentTransactions';
import PageButtons from '../PageButtons/PageButtons';
import RemainingBalanceChart from '../RemainingBalance/RemainingBalanceChart';

const AtmContainer = (props) => {
  return (
    <React.Fragment>
      <Amount {...props} />
      <Withdraw {...props} />
      <h1 className="acct-title">Your Account</h1>
      <PageButtons {...props} />
      {props.pageName === "Recent Transactions" && 
      <RecentTransactions {...props}/> }
      {props.pageName === "Remaining Balance" && 
      <RemainingBalanceChart {...props} /> }
    </React.Fragment>
  );
}

export default AtmContainer;

