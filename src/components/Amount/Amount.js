import React from 'react';
import './Amount.css'

const Amount = ({newBalance}) => (
  <h1 className="initial-balance">
    ${newBalance}
  </h1>
)

export default Amount 