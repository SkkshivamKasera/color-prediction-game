import { app } from './app.js'
import dotenv from 'dotenv'
import { database_connection } from './config/database_connection.js'
import { connectPassport } from './utils.js'
import Razorpay from 'razorpay'
import path from "path"
import express from 'express'
import { fileURLToPath } from 'url'

dotenv.config({ path: "./backend/config/config.env" })

database_connection()
connectPassport()

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const fileName = fileURLToPath(import.meta.url)
const dirName = path.dirname(fileName)

app.use(express.static(path.join(dirName, "../client/build")))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(dirName, "../client/build/index.html"))
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on : http://localhost:${process.env.PORT}`)
})