import { User } from "../models/userModel.js"
import { sendError } from "../utils.js"
import { instance } from "../server.js"
import crypto from 'crypto'
import { Payment } from '../models/payment.js'

export const createOrder = async (req, res) => {
    try{
        const { amount } = req.body
        if(Number(amount) <= 0){
            return sendError(res, 400, "Invalid Amount")
        }
        const id = req.id
        const user = await User.findById(id)
        if(!user){
            return sendError(res, 400, "Data Not Found")
        }
        const options = {
            amount: Number(amount)*100,
            currency: "INR",
        }
        const order = await instance.orders.create(options)
        return res.status(200).json({ success: true, order, amount })
    }catch(error){
        return sendError(res, 500, error.message)
    }
}

export const paymentVerification = async (req, res) => {
    try{
        const id = req.id
        const { 
            razorpay_payment_id, 
            razorpay_order_id, 
            razorpay_signature, 
            amount
        } = req.body
        if(Number(amount) <= 0){
            return sendError(res, 400, "Invalid Amount")
        }
        const user = await User.findById(id)
        if(!user){
            return sendError(res, 400, "Data Not Found")
        }
        const body = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSignature = await crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex")
        const isAuthentic = expectedSignature === razorpay_signature
        if(isAuthentic){
            const payment = await Payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            })
            user.balance += Number(amount)
            user.recharges.unshift({
                paymentId: payment._id,
                amount: amount,
                status: true,
                paidAt: new Date(Date.now())
            })
            await user.save()
            return res.status(200).json({ success: true, message: "Payment Success" })
        }else{
            user.recharges.unshift({
                paymentId: "Not generated due to payment fail",
                amount: amount,
                status: false,
                paidAt: new Date(Date.now())
            })
            await user.save()
            return sendError(res, 400, "Payment Failed")
        }
    }catch(error){
        return sendError(res, 500, error.message)
    }
}

export const withdraw = async (req, res) => {
    try{
        const { amount } = req.body
        const id = req.id
        const user = await User.findById(id)
        if(Number(amount) <= 100 || Number(amount) > user.balance){
            return sendError(res, 400, "withdrawal amount is invalid")
        }
        user.balance -= Number(amount)
        await user.save()
        return res.status(200).json({ success: true, message: "Withdraw Successfully" })
    }catch(error){
        return sendError(res, 500, error.message)
    }
}