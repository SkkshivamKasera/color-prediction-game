import mongoose from "mongoose";

const cpSchema = new mongoose.Schema({
    tax: {
        type: Number,
        default: 1
    },
    user: {
        id: {
            type: mongoose.Schema.ObjectId
        },
        period: {
            type: Number,
            default: 20240302000
        },
        results: [
            {
                period: Number,
                price: Number,
                number: Number,
                color: String
            }
        ]
    }
})

export const CP = mongoose.model("cps", cpSchema)