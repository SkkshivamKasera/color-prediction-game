import axios from 'axios'
import { GET, POST, REQUEST_URL } from '../store'

export const fetchGameData = () => async (dispatch) => {
    try{
        dispatch({ type: "FETCH_GAME_DATA_REQUEST" })
        const { data } = await axios.get(`${REQUEST_URL}/fetchgamedata`, GET)
        dispatch({ type: "FETCH_GAME_DATA_SUCCESS", payload: data.gameData })
    }catch(error){
        if(error.response){
            dispatch({ type: "FETCH_GAME_DATA_FAILURE", payload: error.response.data.message })
        }else{
            dispatch({ type: "FETCH_GAME_DATA_FAILURE", payload: error.message })
        }
    }
}

export const updateGameData = (period, price, number, color) => async (dispatch) => {
    try{
        dispatch({ type: "UPDATE_GAME_DATA_REQUEST" })
        const { data } = await axios.post(`${REQUEST_URL}/updategamedata`, {
            period, price, number, color
        }, POST)
        dispatch({ type: "UPDATE_GAME_DATA_SUCCESS", payload: data.gameData })
    }catch(error){
        if(error.response){
            dispatch({ type: "UPDATE_GAME_DATA_FAILURE", payload: error.response.data.message })
        }else{
            dispatch({ type: "UPDATE_GAME_DATA_FAILURE", payload: error.message })
        }
    }
}

export const betApply = (betAmount, applyOn) => async (dispatch) => {
    try{
        dispatch({ type: "BET_REQUEST" })
        const { data } = await axios.post(`${REQUEST_URL}/bet`, {
            betAmount, applyOn
        }, POST)
        dispatch({ type: "BET_SUCCESS", payload: data.message })
    }catch(error){
        if(error.response){
            dispatch({ type: "BET_FAILURE", payload: error.response.data.message })
        }else{
            dispatch({ type: "BET_FAILURE", payload: error.message })
        }
    }
}

export const winOrLose = (Amount) => async (dispatch) => {
    try{
        dispatch({ type: "WIN_OR_LOSE_REQUEST" })
        const { data } = await axios.post(`${REQUEST_URL}/win_or_lose`, {
            Amount
        }, POST)
        dispatch({ type: "WIN_OR_LOSE_SUCCESS", payload: data.message })
    }catch(error){
        if(error.response){
            dispatch({ type: "WIN_OR_LOSE_FAILURE", payload: error.response.data.message })
        }else{
            dispatch({ type: "WIN_OR_LOSE_FAILURE", payload: error.message })
        }
    }
}