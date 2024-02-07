import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    googleId: {
        type: String
    },
    password: {
        type: String
    },
    balance: {
        type: Number,
        default: 0
    },
    recharges: [
        {
            paymentId: String,
            amount: Number,
            status: Boolean,
            paidAt: Date
        }
    ],
    withdraws: [
        {
            paymentId: String,
            amount: Number,
            status: {
                type: String,
                default: "pending"
            },
            withdrawAt: Date
        }
    ],
    createdAT: {
        type: Date,
        default: Date.now
    }
})

export const User = mongoose.model("users", userSchema)