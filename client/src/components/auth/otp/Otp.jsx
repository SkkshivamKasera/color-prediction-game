import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Otp.css";
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../../redux/actions/userAction';
import toast from 'react-hot-toast'

const Otp = ({ name, email, password }) => {
  const [userOtp_1, setUserOtp_1] = useState("")
  const [userOtp_2, setUserOtp_2] = useState("")
  const [userOtp_3, setUserOtp_3] = useState("")
  const [userOtp_4, setUserOtp_4] = useState("")

  const navigate = useNavigate();

  const dispatch = useDispatch()
  const { otp } = useSelector(state => state.user)

  const verifyOtp = async () => {
    const userOtp = userOtp_1 + userOtp_2 + userOtp_3 + userOtp_4
    if(Number(userOtp) === otp){
      await dispatch(signup(name, email, password))
      await dispatch({ type: "CLEAR_OTP" })
    }else{
      toast.error("wrong otp")
    }
  }

  const { isAuthenticated } = useSelector(state => state.user)
    useEffect(() => {
        if(isAuthenticated){
            navigate("/")
        }
    }, [isAuthenticated])

  return (
    <div className="otp-container">
      <div className="otp-content">
        <div className="otp-head">
          <h1>Verify Email</h1>
          <p>Check your email and please enter OTP to continue</p>
        </div>
        <div className="otp-input-section">
          <input type="text" name="" id="" maxLength={1} pattern='\d' inputMode='numeric' required value={userOtp_1} onChange={(e)=>setUserOtp_1(e.target.value)} />
          <input type="text" name="" id="" maxLength={1} pattern='\d' inputMode='numeric' required value={userOtp_2} onChange={(e)=>setUserOtp_2(e.target.value)} />
          <input type="text" name="" id="" maxLength={1} pattern='\d' inputMode='numeric' required value={userOtp_3} onChange={(e)=>setUserOtp_3(e.target.value)} />
          <input type="text" name="" id="" maxLength={1} pattern='\d' inputMode='numeric' required value={userOtp_4} onChange={(e)=>setUserOtp_4(e.target.value)} />
        </div>
        <div className="otp-verify-btn">
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      </div>
    </div>
  );
};

export default Otp;