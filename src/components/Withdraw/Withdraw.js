import React from 'react';
import './Withdraw.css'
import { Input } from 'semantic-ui-react'

const Withdraw = ({handleChange, withdrawValue, withdraw, error}) => (
  <div className="withdraw-container">
    <p className="withdraw-title">Withdraw Cash</p>
    <div className="withdraw-form">
      <div className="dollar">
        <Input 
          onChange={handleChange} 
          type="number" 
          fluid 
          className="withdraw-input" 
          size="huge" 
          placeholder="0.00" 
          value={withdrawValue}
        />
      </div>
      <button onClick={withdraw} className="withdraw-button">
        Withdraw
      </button>
    </div>
    { error !== "" && 
    <p className="error-message">
      {error}
    </p> }
  </div>
)

export default Withdraw 