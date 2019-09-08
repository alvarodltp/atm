import React from 'react';
import './PageButtons.css'

const PageButtons = ({ handlePageChange, pageName }) => (
  <div className="button-container">
    <button 
      className={`recent-transaction${pageName === "Recent Transactions" ? ' active-button' : ''}`}
      onClick={() => {handlePageChange("Recent Transactions")}}
    >
      Recent Transactions
    </button>
    <button 
      className={`remaining-balance${pageName === "Remaining Balance" ? ' active-button' : ''}`}
      onClick={() => {handlePageChange("Remaining Balance")}}
    >
      Remaining Balance
    </button>
  </div>
)

export default PageButtons;
