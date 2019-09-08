import React from 'react';
import './RecentTransactions.css';
import {Dropdown} from 'semantic-ui-react';
import './RecentTransactions.css';
import { filterOptions } from './dropdownData';

const RecentTransactions = (props) => {
  const { 
    handleFilter, 
    filter, 
    selectedTransactions, 
    paginationArr, 
    paginationStyle, 
    currentPageNumber, 
    handlePagination 
  } = props;

  return(
    <div className="transaction-container">
      <div className="filter">
        <Dropdown icon="filter" onChange={(_, data) => handleFilter(data)} value={filter} className="filter" placeholder='Filter' options={filterOptions} />
      </div>

      <div className="transaction">
        <strong className="name">Description</strong>
        <strong className="amount">Amount</strong>
      </div>

      {selectedTransactions.map((transaction, i) => 
      <div key={i} className="transaction">
        <p className="name">{transaction.name}</p>
        <p className="amount">- ${transaction.amount}</p>
      </div> )}
      
      <div className="pagination">
        {paginationArr.map((number, i) => 
        <div 
          style={currentPageNumber === number ? paginationStyle : null} 
          key={i} 
          onClick={() => {handlePagination(number)}}
        >
          {number}
        </div>)}
      </div>
    </div>
  )
}

export default RecentTransactions 