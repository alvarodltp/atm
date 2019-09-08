import React from 'react';
import './PageButtons.css'

const buttonStyle = {background: "#F10270", color: "white"}

const PageButtons = (props) => {
  return (
    <div className="button-container">
      <button 
      className="recent-transactions" 
      onClick={() => {props.handlePageChange("Recent Transactions")}}
      style={ props.pageName === "Recent Transactions" ? buttonStyle : null }
      >
        Recent Transactions
      </button>
      <button 
      className="remaining-balance" 
      onClick={() => {props.handlePageChange("Remaining Balance")}}
      style={ props.pageName === "Remaining Balance" ? buttonStyle : null }
      >
        Remaining Balance
      </button>
    </div>
  );
}

export default PageButtons;