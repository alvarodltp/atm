import React from 'react';
import './RecentTransactions.css';
import {Dropdown} from 'semantic-ui-react';
import './RecentTransactions.css';

const filterOptions = [
  {key: 'all', text: 'All', value: 'all'},
  {key: 'ascending', text: 'Low To High', value: 'ascending'}, 
  {key: 'descending', text: 'High To Low', value: 'descending'}
];

const RecentTransactions = (props) => {
  return(
    <div className="transaction-container">
      <div className="filter">
        <Dropdown onChange={(_, data) => props.handleFilter(data)} value={props.filter} className="filter" placeholder='Filter' options={filterOptions} />
      </div>
      <div className="transaction">
        <strong className="name">Description</strong>
        <strong className="amount">Amount</strong>
      </div>
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