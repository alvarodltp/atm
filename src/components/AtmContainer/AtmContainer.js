import React from 'react';
import Amount from '../Amount/Amount';
import Withdraw from '../Withdraw/Withdraw';
import RecentTransactions from '../RecentTransactions/RecentTransactions';
import Pagination from '../Pagination/Pagination';
import PageButtons from '../PageButtons/PageButtons'

const AtmContainer = (props) => {
  return (
    <React.Fragment>
      <h1 style={{padding: "10px", fontSize: "40px", margin: "0"}}>ATM</h1>
      <Amount balance={props.balance} />
      <Withdraw error={props.error} withdraw={props.withdraw} handleChange={props.handleChange} withdrawValue={props.withdrawValue} />
      <PageButtons handlePageChange={props.handlePageChange}/>
      {props.pageName === "Recent Transactions" && 
      <RecentTransactions selectedTransactions={props.selectedTransactions} paginationStyle={props.paginationStyle} currentPageNumber={props.currentPageNumber} handlePagination={props.handlePagination} paginationArr={props.paginationArr}/> }
    </React.Fragment>
  );
}


export default AtmContainer;
