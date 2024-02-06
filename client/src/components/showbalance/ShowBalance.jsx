import React from 'react'
import { Link } from 'react-router-dom'
import { MdRefresh } from 'react-icons/md'
import "./ShowBalance.css"
import { useSelector } from 'react-redux'

const ShowBalance = ({setGetUser}) => {
    const { user } = useSelector(state => state.user)
  return (
    <div className="show-balance-container">
        <div className="show-balance-content">
            <div className="available-balance">
                <span>Available Balance : ₹{user && user.balance}</span>
            </div>
            <div className="show-balance-btns">
                <div className="inner-btns">
                    <Link to="/payment/recharge">Recharge</Link>
                    <Link to="/payment/withdraw">Withdraw</Link>
                </div>
                <div className="refresh-svg">
                    <MdRefresh onClick={()=>setGetUser(false)}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ShowBalance
