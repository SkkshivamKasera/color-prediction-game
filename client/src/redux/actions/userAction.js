import axios from 'axios'
import { GET, POST, REQUEST_URL } from '../store'

export const getOtp = (email) => async (dispatch) => {
    try{
        dispatch({ type: "OTP_REQUEST" })
        const { data } = await axios.post(`${REQUEST_URL}/getotp`, {
            email
        }, POST)
        dispatch({ type: "OTP_SUCCESS", payload: data })
    }catch(error){
        if(error.response){
            dispatch({ type: "OTP_FAIL", payload: error.response.data.message })
        }else{
            dispatch({ type: "OTP_FAIL", payload: error.message })
        }
    }
}

export const signup = (name, email, password) => async (dispatch) => {
    try{
        dispatch({ type: "SIGNUP_REQUEST" })
        const { data } = await axios.post(`${REQUEST_URL}/signup`, {
            name, email, password
        }, POST)
        dispatch({ type: "SIGNUP_SUCCESS", payload: data.message })
    }catch(error){
        if(error.response){
            dispatch({ type: "SIGNUP_FAIL", payload: error.response.data.message })
        }else{
            dispatch({ type: "SIGNUP_FAIL", payload: error.message })
        }
    }
}

export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({ type: "LOGIN_REQUEST" })
        const { data } = await axios.post(`${REQUEST_URL}/login_pass`, {
            email, password
        }, POST)
        dispatch({ type: "LOGIN_SUCCESS", payload: data.message })
    }catch(error){
        if(error.response){
            dispatch({ type: "LOGIN_FAIL", payload: error.response.data.message })
        }else{
            dispatch({ type: "LOGIN_FAIL", payload: error.message })
        }
    }
}

export const loadUser = () => async (dispatch) => {
    try{
        dispatch({ type: "LOAD_USER_REQUEST" })
        const { data } = await axios.get(`${REQUEST_URL}/myprofile`, GET)
        dispatch({ type: "LOAD_USER_SUCCESS", payload: data.user })
    }catch(error){
        if(error.response){
            dispatch({ type: "LOAD_USER_FAIL", payload: error.response.data.message })
        }else{
            dispatch({ type: "LOAD_USER_FAIL", payload: error.message })
        }
    }
}

export const forgotpassword = (email) => async (dispatch) => {
    try{
        dispatch({ type: "FORGOT_PASSWORD_REQUEST" })
        const { data } = await axios.post(`${REQUEST_URL}/password/forgot`, {
            email
        }, POST)
        dispatch({ type: "FORGOT_PASSWORD_SUCCESS", payload: data.message })
    }catch(error){
        if(error.response){
            dispatch({ type: "FORGOT_PASSWORD_FAIL", payload: error.response.data.message })
        }else{
            dispatch({ type: "FORGOT_PASSWORD_FAIL", payload: error.message })
        }
    }
}

export const resetpassword = (password, id) => async (dispatch) => {
    try{
        dispatch({ type: "RESET_PASSWORD_REQUEST" })
        const { data } = await axios.post(`${REQUEST_URL}/password/reset/${id}`, {
            password
        }, POST)
        dispatch({ type: "RESET_PASSWORD_SUCCESS", payload: data.message })
    }catch(error){
        if(error.response){
            dispatch({ type: "RESET_PASSWORD_FAIL", payload: error.response.data.message })
        }else{
            dispatch({ type: "RESET_PASSWORD_FAIL", payload: error.message })
        }
    }
}