import React from 'react';
import './PageButtons.css'

const buttonStyle = {background: "#F10270", color: "white"}

const PageButtons = (props) => {
  console.log(props)
  return (
    <div className="button-container">
      <btn 
      className="transaction-button" 
      onClick={() => {props.handlePageChange("Recent Transactions")}}
      style={ props.pageName === "Recent Transactions" ? buttonStyle : null }
      >
        Recent Transactions
      </btn>
      <btn 
      className="transaction-button" 
      onClick={() => {props.handlePageChange("Remaining Balance")}}
      style={ props.pageName === "Remaining Balance" ? buttonStyle : null }
      >
        Remaining Balance
      </btn>
    </div>
  );
}

export default PageButtons;