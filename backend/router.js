import express from 'express'
import passport from 'passport'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { forgotPassword, getMyProfile, getOtp, login, logout, resetPassword, signup } from './actions/userAction.js'
import { isAuthenticated } from './middleware.js'
import { applyBet, fetchGameData, updateGameData, winningLosingPeriod } from './actions/gameAction.js'
import { createOrder, paymentVerification, withdraw } from './actions/paymentAction.js'

export const router = express.Router()
dotenv.config({ path: "./backend/config/config.env" })

router.route("/google_login").get(passport.authenticate("google", {
    scope: ["profile", "email"]
}))

router.route("/login").get((req, res, next) => {
    passport.authenticate("google", { scope: ['profile', 'email'] })(req, res, next);
}, async (req, res) => {
    try {
        const token = await jwt.sign({ id: req.user._id }, process.env.JWT_SIGN)
        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000
        })
        res.redirect(process.env.FRONTEND_URL);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

//authentication
router.route("/signup").post(signup)
router.route("/getotp").post(getOtp)
router.route("/login_pass").post(login)
router.route("/myprofile").get(isAuthenticated, getMyProfile)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:id").post(resetPassword)
router.route("/logout").get(isAuthenticated, logout)

//games routers
router.route("/fetchgamedata").get(isAuthenticated, fetchGameData)
router.route("/updategamedata").post(isAuthenticated, updateGameData)
router.route("/bet").post(isAuthenticated, applyBet)
router.route("/win_or_lose").post(isAuthenticated, winningLosingPeriod)

//recharge or withdraw
router.route("/payment/create/order").post(isAuthenticated, createOrder)
router.route("/payment/verification").post(isAuthenticated, paymentVerification)
router.route("/payment/withdraw").post(isAuthenticated, withdraw)