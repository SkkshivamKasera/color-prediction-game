import React, { useEffect, useState } from 'react'
import { FaLockOpen, FaLock } from 'react-icons/fa6'
import './ResetPassword.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { resetpassword } from '../../../redux/actions/userAction'
import toast from 'react-hot-toast'

const ResetPassword = () => {
    const { isAuthenticated } = useSelector(state => state.user)
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    useEffect(() => {
        if(isAuthenticated){
            navigate("/")
        }
    }, [isAuthenticated])
    const submitHandler = (e) => {
        e.preventDefault()
        if(newPassword === confirmPassword){
            dispatch(resetpassword(newPassword, params.token))
        }else{
            toast.error("Both Passwords are not matched")
        }
    }
    return (
        <div className="auth-container">
            <form action="" className="form reset-form" onSubmit={submitHandler}>
                <div className="head reset-head">
                    <h1>Reset Password</h1>
                </div>
                <div className="form-group password reset-password-text">
                    <div className="at-svg svg reset-at-svg">
                        <label htmlFor='reset-password-text-id'><FaLockOpen /></label>
                    </div>
                    <input type="text" required name="password" id="reset-password-text-id" placeholder='New Password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                </div>
                <div className="form-group password reset-password">
                    <div className="at-svg svg reset-at-svg">
                        <label htmlFor='reset-password-id'><FaLock /></label>
                    </div>
                    <input type="password" required name="password" id="reset-password-id" placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </div>
                <div className="btn reset-btn">
                    <button type='submit'>Change Password</button>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword
