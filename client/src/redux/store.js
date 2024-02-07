import { configureStore } from '@reduxjs/toolkit'
import { gameReducer, paymentReducer, userReducer } from './reducer'

export const store = configureStore({
    reducer: {
        user: userReducer,
        game: gameReducer,
        payment: paymentReducer
    }
})

export const REQUEST_URL = "https://color-prediction-tts2.onrender.com/api/v1"

export const POST = {
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
}
export const GET = {
    withCredentials: true
}