import React from 'react';
import './Amount.css'

const Amount = (props) => {
  return(
    <div className="initial-balance-container">
      <h1>${props.newBalance}</h1>
    </div>
  )
}

export default Amount 