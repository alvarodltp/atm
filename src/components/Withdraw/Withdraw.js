import React from 'react';
import './Withdraw.css'
import { Input } from 'semantic-ui-react'

const Withdraw = (props) => {
  return(
    <React.Fragment>
      <div className="withdraw-container">
        <p className="withdraw-title">Withdraw Cash</p>
        <div className="withdraw-form">
          <div className="dollar">
            <Input onChange={props.handleChange} type="number" fluid className="withdraw-input" size="huge" placeholder="0.00" value={props.withdrawValue}/>
          </div>
          <button onClick={props.withdraw} className="withdraw-button">
            Withdraw
          </button>
        </div>
        { props.error !== "" ?
        <p style={{textAlign: "center", padding: "5px", fontSize: "16px", color: "white"}}>   {props.error}
         </p> : null }
      </div>
    </React.Fragment>
  )
}

export default Withdraw 