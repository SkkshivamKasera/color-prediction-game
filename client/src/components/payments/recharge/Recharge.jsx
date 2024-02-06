import React, { useState } from 'react'
import "../Payment.css"
import axios from 'axios'
import { POST, REQUEST_URL } from "../../../redux/store"
import { paymentVerification } from "../../../redux/actions/paymentAction"
import { useDispatch, useSelector } from 'react-redux'

const Recharge = () => {
    const [rechargeAmount, setRechargeAmount] = useState(null)
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)

    const payHandler = async () => {
        const { data: { order, amount } } = await axios.post(`${REQUEST_URL}/payment/create/order`, {
            amount: rechargeAmount
        }, POST)
        const options = {
            key: "rzp_test_M7Mpd1uFyQfsLs",
            "amount": order.amount,
            currency: "INR",
            name: "Color Prediction",
            description: "Color Prediction App",
            order_id: order.id,
            handler: function (response) {
                const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response
                dispatch(paymentVerification(
                    razorpay_payment_id,
                    razorpay_order_id,
                    razorpay_signature,
                    amount
                ))
            },
            theme: {
                color: "#9c003c"
            }
        }
        const rzrpy = window.Razorpay(options)
        rzrpy.open()
    }

    return (
        <div className="payment-container recharge-container">
            <div className="payment-content recharge-content">
                <div className="payment-head recharge-head">
                    <h1>Recharge</h1>
                    <p>Balance : ₹{user && user.balance}</p>
                </div>
                <div className="payment-input recharge-input">
                    <div className="payment-rupee-svg recharge-rupee-svg">
                        <label htmlFor='recharge'>₹</label>
                    </div>
                    <input type="number" name="" id="recharge" placeholder='Amount' value={rechargeAmount} onChange={(e) => setRechargeAmount(e.target.value)} />
                </div>
                <div className="payment-numbers recharge-numbers">
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
                <div className="payment-btn recharge-btn">
                    <button onClick={payHandler}>Pay</button>
                </div>
            </div>
        </div>
    )
}

export default Recharge
