import React, { useEffect, useState } from 'react'
import { FaAt, FaEye, FaEyeSlash, FaFacebook, FaGoogle, FaLock } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import "../Auth.css"
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../redux/actions/userAction'
import { REQUEST_URL } from '../../../redux/store'

const Login = () => {
    const [isHidePass, setIsHidePass] = useState(true)
    const { isAuthenticated } = useSelector(state => state.user)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginHandler = async (e) => {
        e.preventDefault()
        await dispatch(login(email, password))
    }

    const loginWithGoogle = () => {
        window.open(`${REQUEST_URL}/google_login`, "_self")
    }

    useEffect(() => {
        if(isAuthenticated){
            navigate("/")
        }
    }, [isAuthenticated])

    return (
        <div className="auth-container">
            <form action="" className="form login-form" onSubmit={loginHandler}>
                <div className="head login-head">
                    <h1>Login</h1>
                    <p>please login to continue</p>
                </div>
                <div className="form-group email login-email">
                    <div className="at-svg svg login-at-svg">
                        <label htmlFor='login-email-id'><FaAt /></label>
                    </div>
                    <input type="email" required name="email" id="login-email-id" placeholder='Email Id' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="form-group password login-password">
                    <div className="lock-svg svg login-lock-svg">
                        <label htmlFor="login-password-id"><FaLock /></label>
                    </div>
                    <input type={isHidePass ? "password" : "text"} required name="email" id="login-password-id" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <div className="eye-svg svg login-eye-svg">
                        {isHidePass ? <FaEye onClick={() => setIsHidePass(!isHidePass)} /> : <FaEyeSlash onClick={() => setIsHidePass(!isHidePass)} />}
                    </div>
                    <Link to={"/password/forgot"} className="forgot-pass">forgot password</Link>
                </div>
                <div className="btn login-btn">
                    <button type='submit'>Login</button>
                </div>
                <p className='signup-link link'>Create new account? <Link to={"/signup"}>signup</Link></p>
                <div className="or login-or">
                    <span>OR</span>
                </div>
            </form>
            <div className="login-with-google-facebook">
                <button onClick={loginWithGoogle} className='google' id='login-google-id'>Login with google <FaGoogle /></button>
                <button className='facebook' id='login-facebook-id'>Login with facebook <FaFacebook /></button>
            </div>
        </div>
    )
}

export default Login
