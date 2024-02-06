import React, { useState }  from 'react'
import './Bet.css'
import { useDispatch, useSelector } from 'react-redux'
import { betApply } from '../../redux/actions/gameAction'

const Bet = ({ setApplyBetSuccess, counter, betAmount, setBetAmount, applyBetOn, color, setApplyBet }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const [dummyBetAmount, setDummyBetAmount] = useState(0)

    const applyBetHandler = async () => {
        await setBetAmount(dummyBetAmount)
        const betAmount = dummyBetAmount
        await dispatch(betApply(betAmount, applyBetOn))
        setApplyBetSuccess(true)
    }
  return (
    <div className="bet-container">
        <div className="bet-content">
            <div className="bet-heading">
                <h3 className={color}>{applyBetOn}</h3>
            </div>
            <div className="user-balance">
                <h2>Balance : ₹{user && user.balance}</h2>
            </div>
            <div className="bet-input-section">
                <div className="bet-rupe-sign">
                    <span>₹</span>
                </div>
                <input type='number' required placeholder='Amount' value={dummyBetAmount} onChange={(e)=>setDummyBetAmount(e.target.value)}/>
            </div>
            <div className="bet-numbers">
                <div className="first-three-numbers">
                    <div className="20" id={dummyBetAmount===20 && "bet-active-number"} onClick={()=>setDummyBetAmount(20)}>20</div>
                    <div className="50" id={dummyBetAmount===50 && "bet-active-number"} onClick={()=>setDummyBetAmount(50)}>50</div>
                    <div className="100" id={dummyBetAmount===100 && "bet-active-number"} onClick={()=>setDummyBetAmount(100)}>100</div>
                </div>
                <div className="second-three-numbers">
                    <div className="120" id={dummyBetAmount===120 && "bet-active-number"} onClick={()=>setDummyBetAmount(120)}>120</div>
                    <div className="150" id={dummyBetAmount===150 && "bet-active-number"} onClick={()=>setDummyBetAmount(150)}>150</div>
                    <div className="200" id={dummyBetAmount===200 && "bet-active-number"} onClick={()=>setDummyBetAmount(200)}>200</div>
                </div>
            </div>
            <div className="bet-apply-cancle-button">
                <button className='cancle' onClick={()=>setApplyBet(false)}>Cancle</button>
                <button className='apply-bet' disabled={counter < 30 || !color || betAmount>0} onClick={applyBetHandler}>Apply Bet</button>
            </div>
        </div>
    </div>
  )
}

export default Bet
