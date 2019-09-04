import React from 'react';
import './PageButtons.css'

const PageButtons = (props) => {
  return (
    <div className="button-container">
      <div className="transaction-button" onClick={() => {props.handlePageChange("Recent Transactions")}}>Recent Transactions</div>
      <div className="transaction-button" onClick={() => {props.handlePageChange("Remaining Balance")}}>Remaining Balance</div>
    </div>
  );
}


export default PageButtons;