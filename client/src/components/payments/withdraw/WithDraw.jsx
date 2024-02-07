import React, { useState } from 'react'
import "../Payment.css"
import { useDispatch, useSelector } from 'react-redux'
import { withDraw } from '../../../redux/actions/paymentAction'

const WithDraw = () => {
    const [rechargeAmount, setRechargeAmount] = useState(null)
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)

    const withDrawHandler = () => {
        dispatch(withDraw(rechargeAmount))
    }

    return (
        <div className="payment-container withdraw-container">
            <div className="payment-content recharge-content">
                <div className="payment-head withdraw-head">
                    <h1>Withdraw</h1>
                    <p>Balance : ₹{user && user.balance}</p>
                </div>
                <div className="payment-input withdraw-input">
                    <div className="payment-rupee-svg withdraw-rupee-svg">
                        <label htmlFor='recharge'>₹</label>
                    </div>
                    <input type="number" name="" id="recharge" placeholder='Amount' value={rechargeAmount} onChange={(e) => setRechargeAmount(e.target.value)} />
                </div>
                <div className="payment-numbers withdraw-numbers">
                    <div>
                        <div className="100" id={rechargeAmount === 100 && "active_payment"} onClick={() => setRechargeAmount(100)}>100</div>
                        <div className="200" id={rechargeAmount === 200 && "active_payment"} onClick={() => setRechargeAmount(200)}>200</div>
                        <div className="300" id={rechargeAmount === 300 && "active_payment"} onClick={() => setRechargeAmount(300)}>300</div>
                    </div>
                    <div>
                        <div className="400" id={rechargeAmount === 400 && "active_payment"} onClick={() => setRechargeAmount(400)}>400</div>
                        <div className="500" id={rechargeAmount === 500 && "active_payment"} onClick={() => setRechargeAmount(500)}>500</div>
                        <div className="600" id={rechargeAmount === 600 && "active_payment"} onClick={() => setRechargeAmount(600)}>600</div>
                    </div>
                </div>
                <div className="payment-btn withdraw-btn">
                    <button disabled={!rechargeAmount} onClick={withDrawHandler}>Withdraw</button>
                </div>
                <div className="payment-table">
                    <table>
                        <tr>
                            <th>Payment ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                        {
                            user && user.withdraws && user.withdraws.map((item, index) => {
                                if (index <= 6 && item.paymentId !== undefined) {
                                    return (
                                        <tr key={index}>
                                            <td>{item.paymentId}</td>
                                            <td>{item.amount}</td>
                                            <td style={{ textTransform: "capitalize" }}>{item.status}</td>
                                            <td>{item.withdrawAt && item.withdrawAt.split("T")[0]}</td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </table>
                </div>
            </div>
        </div>
    )
}

export default WithDraw