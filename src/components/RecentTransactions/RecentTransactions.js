import React from 'react';
import './RecentTransactions.css';

const RecentTransactions = (props) => {
  return(
    props.transactions.map((transaction, i) => 
    <div  key={i} className="transaction-container">
      <div>{transaction.name}</div>
      <div>{transaction.amount}</div>
    </div>
    )
  )
}

export default RecentTransactions 