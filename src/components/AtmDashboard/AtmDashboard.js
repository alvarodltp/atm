import React from 'react';
import Amount from '../Amount/Amount';
import Withdraw from '../Withdraw/Withdraw';
import RecentTransactions from '../RecentTransactions/RecentTransactions';
import PageButtons from '../PageButtons/PageButtons';
import RemainingBalanceChart from '../RemainingBalance/RemainingBalanceChart';
import './AtmDashboard.css';

const AtmDashboard = (props) => {
  const { 
    pageName, 
    newBalance, 
    handlePageChange, 
    handleChange,
    withdrawValue, 
    withdraw, 
    error, 
    data
  } = props;
  
  return (
    <React.Fragment>
      <Amount newBalance={newBalance} />
      <Withdraw withdrawValue={withdrawValue} withdraw={withdraw} error={error} handleChange={handleChange}/>
      <h1 className="acct-title">Your Account</h1>
      <PageButtons handlePageChange={handlePageChange} pageName={pageName} />
      {pageName === "Recent Transactions" && 
      <RecentTransactions {...props}/> }
      {pageName === "Remaining Balance" && 
      <RemainingBalanceChart data={data} /> }
    </React.Fragment>
  );
}

export default AtmDashboard;

