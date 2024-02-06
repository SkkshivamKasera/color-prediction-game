import bcrypt from 'bcrypt'
import { sendError, sendToken } from '../utils.js'
import { User } from '../models/userModel.js'
import { CP } from '../models/gameModel.js'
import { sendEmail } from '../sendEmails.js'

export const signup = async (req, res) => {
    try{
        const { name, email, password } = req.body
        if(!name || !email || !password){
            return sendError(res, 400, "All fields are required")
        }
        let user = await User.findOne({ email })
        if(user){
            return sendError(res, 400, "user already exists")
        }
        const salt = await bcrypt.genSalt(10)
        const pass = await bcrypt.hash(password, salt)
        user = await User.create({
            name, email, password: pass
        })
        await CP.create({
            user: {
                id: user._id
            }
        })
        return sendToken(res, user, true, "signup successfully")
    }catch(error){
        return sendError(res, 500, error.message)
    }
}

export const getOtp = async (req, res) => {
    try{
        const { email } = req.body
        const otp = Math.floor(1000 + Math.random() * 9000)
        const options = {
            email, subject: "verify your email with otp", message: "your one time password is : " + otp
        }
        await sendEmail(res, options)
        return res.status(200).json({ success: true, message: "Otp Send Successfully", otp })
    }catch(error){
        return sendError(res, 500, error.message)
    }
}

export const login = async (req, res) => {
    try{
        const { email, password } = req.body
        if(!email || !password){
            return sendError(res, 400, "All fields are required")
        }
        let user = await User.findOne({ email })
        if(!user){
            return sendError(res, 400, "invalid email or password")
        }
        if(!user.password){
            return sendError(res, 400, "invalid email or password")
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return sendError(res, 400, "invalid email or password")
        }
        return sendToken(res, user, true, "login successfully")
    }catch(error){
        return sendError(res, 500, error.message)
    }
}

export const getMyProfile = async (req, res) => {
    try{
        const id = req.id
        const user = await User.findById(id)
        return res.status(200).json({ success: true, user })
    }catch(error){
        return sendError(res, 500, error.message)
    }
}

export const forgotPassword = async (req, res) => {
    try{
        const { email } = req.body
        const user = await User.findOne({ email })
        if(!user){
            return sendError(res, 400, "email not exists")
        }
        if(!user.password){
            return sendError(res, 400, "email not exists")
        }
        const options = {
            email,
            subject: "Forgot Password",
            message: `Your Reset Password Link is : ${process.env.RESET_URL}/${user._id}`
        }
        await sendEmail(res, options)
        return res.status(200).json({ success: true, message: "reset password link is send" })
    }catch(error){
        return sendError(res, 500, error.message)
    }
}

export const resetPassword = async (req, res) => {
    try{
        const { password } = req.body
        const { id } = req.params
        const user = await User.findById(id)
        if(!user){
            return sendError(res, 400, "email not exists")
        }
        if(!user.password){
            return sendError(res, 400, "email not exists")
        }
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)
        user.password = hashPass
        await user.save()
        return res.status(200).json({ success: true, message: "password changed successfully" })
    }catch(error){
        return sendError(res, 500, error.message)
    }
}