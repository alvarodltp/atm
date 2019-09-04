import React from 'react';
import './RecentTransactions.css';

const RecentTransactions = (props) => {
  return(
    <div className="transaction-container">
      <p className="title">Recent Transactions</p>
      {props.transactions.map((transaction, i) => 
      <div key={i} className="transaction">
        <p className="name">{transaction.name}</p>
        <p className="amount">${transaction.amount}</p>
      </div> )}
    </div>
  )
}

export default RecentTransactions 