import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import { router } from './router.js'

export const app = express()
dotenv.config({ path: "./backend/config/config.env" })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "development"? false : true,
        httpOnly: process.env.NODE_ENV === "development"? false : true,
        sameSite: process.env.NODE_ENV === "development"? false : "none"
    }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use("/api/v1", router)