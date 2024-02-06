import { sendError } from "./utils.js"
import jwt from 'jsonwebtoken'

export const isAuthenticated = async (req, res, next) => {
    try{
        const { token } = req.cookies
        if(!token){
            return sendError(res, 400, "please login")
        }
        const decode = await jwt.verify(token, process.env.JWT_SIGN)
        req.id = decode.id
        next()
    }catch(error){
        return sendError(res, 500, error.message)
    }
}