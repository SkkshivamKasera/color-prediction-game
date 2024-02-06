import { createReducer } from '@reduxjs/toolkit'

export const userReducer = createReducer({ isAuthenticated: false }, (builder)=>{
    builder
    .addCase("SIGNUP_REQUEST", (state) => {
        state.loading = true
        state.isAuthenticated = false
    })
    .addCase("SIGNUP_SUCCESS", (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.message = action.payload
    })
    .addCase("SIGNUP_FAIL", (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.error = action.payload
    })
    .addCase("OTP_REQUEST", (state) => {
        state.loading = true
        state.isAuthenticated = false
    })
    .addCase("OTP_SUCCESS", (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.otp = action.payload.otp
        state.message = action.payload.message
    })
    .addCase("OTP_FAIL", (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.error = action.payload
    })
    .addCase("LOGIN_REQUEST", (state) => {
        state.loading = true
        state.isAuthenticated = false
    })
    .addCase("LOGIN_SUCCESS", (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.message = action.payload
    })
    .addCase("LOGIN_FAIL", (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.error = action.payload
    })
    .addCase("LOAD_USER_REQUEST", (state) => {
        state.loading = true
        state.isAuthenticated = false
    })
    .addCase("LOAD_USER_SUCCESS", (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
    })
    .addCase("LOAD_USER_FAIL", (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.error = action.payload
    })
    .addCase("FORGOT_PASSWORD_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("FORGOT_PASSWORD_SUCCESS", (state, action) => {
        state.loading = false
        state.message = action.payload
    })
    .addCase("FORGOT_PASSWORD_FAIL", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("RESET_PASSWORD_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("RESET_PASSWORD_SUCCESS", (state, action) => {
        state.loading = false
        state.message = action.payload
    })
    .addCase("RESET_PASSWORD_FAIL", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("CLEAR_ERROR", (state) => {
        state.error = null
    })
    .addCase("CLEAR_MESSAGE", (state) => {
        state.message = null
    })
    .addCase("CLEAR_OTP", (state) => {
        state.otp = null
    })
})

export const gameReducer = createReducer({  }, (builder) => {
    builder
    .addCase("FETCH_GAME_DATA_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("FETCH_GAME_DATA_SUCCESS", (state, action) => {
        state.loading = false
        state.gameData = action.payload
    })
    .addCase("FETCH_GAME_DATA_FAILURE", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("UPDATE_GAME_DATA_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("UPDATE_GAME_DATA_SUCCESS", (state, action) => {
        state.loading = false
        state.gameData = action.payload
    })
    .addCase("UPDATE_GAME_DATA_FAILURE", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("BET_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("BET_SUCCESS", (state, action) => {
        state.loading = false
        state.message = action.payload
    })
    .addCase("BET_FAILURE", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("WIN_OR_LOSE_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("WIN_OR_LOSE_SUCCESS", (state, action) => {
        state.loading = false
        state.message = action.payload
    })
    .addCase("WIN_OR_LOSE_FAILURE", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("CLEAR_ERROR", (state) => {
        state.error = null
    })
    .addCase("CLEAR_MESSAGE", (state) => {
        state.message = null
    })
})

export const paymentReducer = createReducer({  }, (builder) => {
    builder
    .addCase("CREATE_ORDER_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("CREATE_ORDER_SUCCESS", (state, action) => {
        state.loading = false
        state.message = action.payload
    })
    .addCase("CREATE_ORDER_FAIL", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("PAYMENT_ORDER_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("PAYMENT_ORDER_SUCCESS", (state, action) => {
        state.loading = false
        state.message = action.payload
    })
    .addCase("PAYMENT_ORDER_FAIL", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("PAYMENT_WITHDRAW_REQUEST", (state) => {
        state.loading = true
    })
    .addCase("PAYMENT_WITHDRAW_SUCCESS", (state, action) => {
        state.loading = false
        state.message = action.payload
    })
    .addCase("PAYMENT_WITHDRAW_FAIL", (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    .addCase("CLEAR_ERROR", (state) => {
        state.error = null
    })
    .addCase("CLEAR_MESSAGE", (state) => {
        state.message = null
    })
})