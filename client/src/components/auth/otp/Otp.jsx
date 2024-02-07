import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Otp.css";
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../../redux/actions/userAction';
import toast from 'react-hot-toast'

let currentOtpIndex  = 0

const Otp = ({ name, email, password, setGetUser }) => {
  const [inputOtp, setInputOtp] = useState(new Array(4).fill(""))
  const [activeOtpIndex, setActiveOtpIndex] = useState(0)
  const inputRef = useRef(null)

  const navigate = useNavigate();

  const dispatch = useDispatch()
  const { otp } = useSelector(state => state.user)

  const verifyOtp = async () => {
    let userOtp = ""
    for(let i=0;i<inputOtp.length;i++){
      userOtp += inputOtp[i]
    }
    if(Number(userOtp) === otp){
      await dispatch(signup(name, email, password))
      await dispatch({ type: "CLEAR_OTP" })
      setGetUser(false)
    }else{
      toast.error("wrong otp")
    }
  }

  const changeHandler = (e) => {
    const value = e.target.value
    const newOtp = [...inputOtp]
    newOtp[currentOtpIndex] = value.substring(value.length - 1)
    if(!value){
      setActiveOtpIndex(currentOtpIndex - 1)
    }else{
      setActiveOtpIndex(currentOtpIndex + 1)
    }
    setInputOtp(newOtp)
  }

  const handleKeyDown = (e, index) => {
    currentOtpIndex = index
    if(e.key === "Backspace"){
      setActiveOtpIndex(currentOtpIndex - 1)
    }
  }

  const { isAuthenticated } = useSelector(state => state.user)
    useEffect(() => {
        if(isAuthenticated){
            navigate("/")
        }
    }, [isAuthenticated, navigate])

    useEffect(() => {
      inputRef.current?.focus()
    }, [activeOtpIndex])

  return (
    <div className="otp-container">
      <div className="otp-content">
        <div className="otp-head">
          <h1>Verify Email</h1>
          <p>Check your email and please enter OTP to continue</p>
        </div>
        <div className="otp-input-section">
          {
            inputOtp && inputOtp.map((_, index) => {
              return (
                <input onChange={changeHandler} ref={index === activeOtpIndex ? inputRef : null} type='number' value={inputOtp[index]} onKeyDown={(e) => handleKeyDown(e, index)}/>
              )
            })
          }
        </div>
        <div className="otp-verify-btn">
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      </div>
    </div>
  );
};

export default Otp;