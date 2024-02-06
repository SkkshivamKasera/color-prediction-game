import { CP } from '../models/gameModel.js'
import { User } from '../models/userModel.js'
import { sendError } from '../utils.js'

export const fetchGameData = async (req, res) => {
    try{
        const id = req.id
        const user = await User.findById(id)
        if(!user){
            return sendError(res, 400, "Your game data is deleted for reason")
        }
        const gameData = await CP.findOne({ "user.id": user._id })
        if(!gameData){
            return sendError(res, 400, "Your game data is deleted for reason")
        }
        return res.status(200).json({ success: true, gameData })
    }catch(error){
        return sendError(res, 500, error.message)
    }
}

export const updateGameData = async (req, res) => {
    try{
        const id = req.id
        const { period, price, number, color } = req.body
        const user = await User.findById(id)
        if(!user){
            return sendError(res, 400, "Your game data is deleted for reason")
        }
        const gameData = await CP.findOne({ "user.id": user._id })
        if(!gameData){
            return sendError(res, 400, "Your game data is deleted for reason")
        }
        await gameData.user.results.unshift({
            period: period,
            price: price,
            number: number,
            color: color
        })
        gameData.user.period += 1
        await gameData.save()
        return res.status(200).json({ success: true, gameData })
    }catch(error){
        return sendError(res, 500, error.message)
    }
}

export const applyBet = async (req, res) => {
    try{
        const id = req.id
        const { betAmount, applyOn } = req.body
        const user = await User.findById(id)
        if(!user){
            return sendError(res, 400, "Your game data is deleted for reason")
        }
        if(betAmount > user.balance){
            return sendError(res, 400, "Insufficient balance")
        }
        user.balance -= Number(betAmount)
        await user.save()
        return res.status(200).json({ success: true, message: `Bet Amount ${betAmount} is successfully apply on ${applyOn}` })
    }catch(error){
        return sendError(res, 500, error.message)
    }
}

export const winningLosingPeriod = async (req, res) => {
    try {
        const id = req.id;
        const { Amount } = req.body;
        const user = await User.findById(id);
        if (!user) {
            return sendError(res, 400, "Your game data is deleted for reason");
        }
        const amount = Number(Amount);
        if (amount < 0) {
            return sendError(res, 400, "fail")
        } else {
            user.balance += amount;
        }
        await user.save();
        return res.status(200).json({ success: true, message: "success" });
    } catch (error) {
        return sendError(res, 500, error.message);
    }
};