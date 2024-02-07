import React from 'react'
import { Link } from 'react-router-dom'
import { MdExitToApp, MdRefresh } from 'react-icons/md'
import "./ShowBalance.css"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/actions/userAction'

const ShowBalance = ({ setGetUser }) => {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <div className="show-balance-container">
            <div className="show-balance-content">
                <div className="available-balance">
                    <span>Available Balance : ₹{user && user.balance}</span>
                    <div className="exit-svg">
                        <MdExitToApp onClick={logoutHandler}/>
                    </div>
                </div>
                <div className="show-balance-btns">
                    <div className="inner-btns">
                        <Link to="/payment/recharge">Recharge</Link>
                        <Link to="/payment/withdraw">Withdraw</Link>
                    </div>
                    <div className="refresh-svg">
                        <MdRefresh onClick={() => setGetUser(false)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowBalance
