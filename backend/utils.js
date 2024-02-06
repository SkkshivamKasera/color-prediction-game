import jwt from "jsonwebtoken"
import { createTransport } from "nodemailer"
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import passport from "passport"
import { User } from './models/userModel.js'
import { CP } from './models/gameModel.js'

export const sendError = async (res, statusCode, message) => {
    try{
        return res.status(statusCode).json({ success: false, message })
    }catch(error){
        console.log(error.message)
    }
}

export const sendToken = async (res, user, set, message) => {
    try{
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SIGN)
        if(!token){
            return sendError(res, 400, "Token Not Generated")
        }
        return res.cookie("token", set ? token : null, {
            maxAge: set ? 24 * 60 * 60 * 1000 : 0
        }).json({ success: true, message, user })
    }catch(error){
        return sendError(res, 500, error.message)
    }
}

export const sendEmail = async (res, options) => {
    try{
        const transporter = createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSKEY
            }
        })

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: options.email,
            subject: options.subject,
            text: options.message,
            replyTo: options.email
        }

        await transporter.sendMail(mailOptions)
    }catch(error){
        return sendError(res, 500, error.message)
    }
}

export const connectPassport = async () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ['profile', 'email']
    }, async function(accessToken, refreshToken, profile, done){
        const user = await User.findOne({ email: profile.emails[0].value })
        if(!user){
            const newUser = await User.create({
                name: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value
            })
            await CP.create({
                user: {
                    id: newUser._id
                }
            })
            return done(null, newUser)
        }else{
            if(user.password){
                return done(null, false, { message: 'Invalid Email Id' });
            }else{
                return done(null, user)
            }
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id)
        done(null, user)
    })
}