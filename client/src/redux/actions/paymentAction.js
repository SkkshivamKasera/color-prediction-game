import axios from 'axios'
import { POST, REQUEST_URL } from '../store'

export const createOrder = (amount) => async (dispatch) => {
    try {
        dispatch({ type: "CREATE_ORDER_REQUEST" })
        const { data } = await axios.post(`${REQUEST_URL}/payment/create/order`, {
            amount
        }, POST)
        dispatch({ type: "CREATE_ORDER_SUCCESS", payload: data.message })
    } catch (error) {
        if (error.response) {
            dispatch({ type: "CREATE_ORDER_FAIL", payload: error.response.data.message })
        } else {
            dispatch({ type: "CREATE_ORDER_FAIL", payload: error.message })
        }
    }
}

export const paymentVerification = (
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    amount
) => async (dispatch) => {
    try {
        dispatch({ type: "PAYMENT_ORDER_REQUEST" })
        const { data } = await axios.post(`${REQUEST_URL}/payment/verification`, {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            amount
        }, POST)
        dispatch({ type: "PAYMENT_ORDER_SUCCESS", payload: data.message })
    } catch (error) {
        if (error.response) {
            dispatch({ type: "PAYMENT_ORDER_FAIL", payload: error.response.data.message })
        } else {
            dispatch({ type: "PAYMENT_ORDER_FAIL", payload: error.message })
        }
    }
}

export const withDraw = (amount) => async (dispatch) => {
    try {
        dispatch({ type: "PAYMENT_WITHDRAW_REQUEST" })
        const { data } = await axios.post(`${REQUEST_URL}/payment/withdraw`, {
            amount
        }, POST)
        dispatch({ type: "PAYMENT_WITHDRAW_SUCCESS", payload: data.message })
    } catch (error) {
        if (error.response) {
            dispatch({ type: "PAYMENT_WITHDRAW_FAIL", payload: error.response.data.message })
        } else {
            dispatch({ type: "PAYMENT_WITHDRAW_FAIL", payload: error.message })
        }
    }
}