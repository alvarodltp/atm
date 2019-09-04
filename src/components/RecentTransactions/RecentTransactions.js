import React from 'react';
import './RecentTransactions.css';

const RecentTransactions = (props) => {
  return(
    <div className="transaction-container">
      {props.selectedTransactions.map((transaction, i) => 
      <div key={i} className="transaction">
        <p className="name">{transaction.name}</p>
        <p className="amount">- ${transaction.amount}</p>
      </div> )}
      <div className="pagination">
        {props.paginationArr.map((number, i) => <div style={props.currentPageNumber === number ? props.paginationStyle : null} key={i} onClick={() => {props.handlePagination(number)}}>{number}</div>)}
      </div>
    </div>
  )
}

export default RecentTransactions 