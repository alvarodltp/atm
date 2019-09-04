import React from 'react';
import './Amount.css'

const Amount = (props) => {
  return(
    <div className="initial-balance-container">
      <p>${props.balance}</p>
    </div>
  )
}

export default Amount 