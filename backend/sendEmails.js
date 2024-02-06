import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import { sendError } from './utils.js'
import dotenv from 'dotenv'

dotenv.config({ path: "./backend/config/config.env" })

const oAuthClient = new google.auth.OAuth2({
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    redirectUri: process.env.GMAIL_REDIRECT_URL
})

oAuthClient.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN })

export const sendEmail = async (res, options) => {
    try{
        console.log(process.env.GMAIL_REFRESH_TOKEN)
        const accessToken = await oAuthClient.getAccessToken()
        const transport = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            auth: {
                type: process.env.GMAIL_TYPE,
                user: process.env.SMTP_USER,
                clientId: process.env.GMAIL_CLIENT_ID,
                clientSecret: process.env.GMAIL_CLIENT_SECRET,
                refreshToken: process.env.GMAIL_REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: options.email,
            subject: options.subject,
            text: options.message
        }

        await transport.sendMail(mailOptions)
    }catch(error){
        return sendError(res, 500, error.message)
    }
}