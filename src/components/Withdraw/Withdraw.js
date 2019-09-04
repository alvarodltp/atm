import React from 'react';
import './Withdraw.css'
import { Input } from 'semantic-ui-react'

const Withdraw = (props) => {
  return(
    <React.Fragment>
      <div className="withdraw-container">
        <p className="withdraw-title">Withdraw Cash</p>
        <div className="withdraw-form">
          <div className="dollar"><Input onChange={props.handleChange} type="number" className="withdraw-input" size="huge" placeholder="Enter a dollar amount" value={props.withdrawValue}/></div>
          <div onClick={props.withdraw} className="withdraw-button">
            Withdraw
          </div>
        </div>
        { props.error !== "" ?
         <p style={{textAlign: "center", padding: "5px", fontSize: "14px", color: "red"}}>        {props.error}
         </p> : null }
      </div>
    </React.Fragment>
  )
}

export default Withdraw 