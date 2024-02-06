import React, { useEffect, useState } from 'react'
import { FaAt } from 'react-icons/fa6'
import './ForgotPassword.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { forgotpassword } from '../../../redux/actions/userAction'

const ForgotPassword = () => {
    const { isAuthenticated } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    useEffect(() => {
        if(isAuthenticated){
            navigate("/")
        }
    }, [isAuthenticated])
    const forgotRequest = () => {
        dispatch(forgotpassword(email))
    }
    return (
        <div className="auth-container">
            <form action="" className="form forgot-form">
                <div className="head forgot-head">
                    <h1>Forgot Password</h1>
                </div>
                <div className="form-group email forgot-email">
                    <div className="at-svg svg forgot-at-svg">
                        <label htmlFor='forgot-email-id'><FaAt /></label>
                    </div>
                    <input type="email" required name="email" id="forgot-email-id" placeholder='Email Id' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="btn forgot-btn">
                    <button onClick={forgotRequest} disabled={!email} type='submit'>Forgot Password</button>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword
