import React, { useEffect, useState } from 'react'
import { FaAt, FaEye, FaEyeSlash, FaFacebook, FaGoogle, FaLock, FaUser } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import "../Auth.css"
import { useDispatch, useSelector } from 'react-redux'
import { getOtp } from '../../../redux/actions/userAction'
import { REQUEST_URL } from '../../../redux/store'

const SignUp = ({ name, setName, email, setEmail, password, setPassword }) => {
    const [isHidePass, setIsHidePass] = useState(true)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticated } = useSelector(state => state.user)

    const submitHandler = async (e) => {
        e.preventDefault()
        await navigate("/otp")
        await dispatch(getOtp(email))
    }

    const signupWithGoogle = () => {
        window.open(`${REQUEST_URL}/google_login`, "_self")
    }

    useEffect(() => {
        if(isAuthenticated){
            navigate("/")
        }
    }, [isAuthenticated])
    
    return (
        <div className="auth-container">
            <form action="" className="form signup-form" onSubmit={submitHandler}>
                <div className="head signup-head">
                    <h1>Sign Up</h1>
                    <p>create new account</p>
                </div>
                <div className="form-group name signup-name">
                    <div className="user-svg svg signup-user-svg">
                        <label htmlFor='signup-name-id'><FaUser /></label>
                    </div>
                    <input type="text" required name="user" id="signup-user-id" placeholder='User Name' value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className="form-group email signup-email">
                    <div className="at-svg svg signup-at-svg">
                        <label htmlFor='signup-email-id'><FaAt /></label>
                    </div>
                    <input type="email" required name="email" id="signup-email-id" placeholder='Email Id' value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="form-group password signup-password">
                    <div className="lock-svg svg signup-lock-svg">
                        <label htmlFor="signup-password-id"><FaLock /></label>
                    </div>
                    <input type={isHidePass ? "password" : "text"} required name="email" id="signup-password-id" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <div className="eye-svg svg signup-eye-svg">
                        {isHidePass ? <FaEye onClick={() => setIsHidePass(!isHidePass)} /> : <FaEyeSlash onClick={() => setIsHidePass(!isHidePass)} />}
                    </div>
                </div>
                <div className="btn signup-btn">
                    <button type='submit' disabled={!name || !email || !password}>Sign Up</button>
                </div>
                <p className='signup-link link'>Already have an account? <Link to={"/"}>signin</Link></p>
                <div className="or signup-or">
                    <span>OR</span>
                </div>
            </form>
            <div className="login-with-google-facebook">
                <button onClick={signupWithGoogle} className='google' id='signup-google-id'>Signup with google <FaGoogle /></button>
                <button className='facebook' id='signup-facebook-id'>Signup with facebook <FaFacebook /></button>
            </div>
        </div>
    )
}

export default SignUp