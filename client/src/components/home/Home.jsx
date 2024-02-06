import React, { useEffect, useState } from 'react'
import "./Home.css"
import Bet from '../bet/Bet'
import ShowBalance from '../showbalance/ShowBalance'
import { useDispatch, useSelector } from 'react-redux'
import { updateGameData, winOrLose } from '../../redux/actions/gameAction'

const Home = ({ betAmount, setBetAmount, formatCounter, counter, setCounter, setGetUser, betColor, setBetColor }) => {
  const [applyBet, setApplyBet] = useState(false)
  const [applyBetSuccess, setApplyBetSuccess] = useState(false)
  const [applyBetOn, setBetApplyOn] = useState("")
  const [scolor, setSColor] = useState("")
  const dispatch = useDispatch()

  const { gameData } = useSelector(state => state.game)

  const genResult = async () => {
    const period = gameData && gameData.user && gameData.user.period
    const randomValue = Math.floor(Math.random() * 10);
    let color
    if(randomValue === 1 || randomValue === 3 || randomValue === 7 || randomValue === 9){
      color = "green"
    }else if(randomValue === 2 || randomValue === 4 || randomValue === 6 || randomValue === 8){
      color = "red"
    }else{
      color = "violet"
    }
    if(betAmount > 0){
      console.log(color, betColor)
      if(color === betColor){
        await dispatch(winOrLose(betAmount-1))
        await dispatch(updateGameData(period, betAmount, randomValue, color))
      }else{
        await dispatch(winOrLose(0-betAmount))
        await dispatch(updateGameData(period, 0-betAmount, randomValue, color))
      }
      setBetAmount(0)
    }else{
      await dispatch(updateGameData(period, 0, randomValue, color))
    }
  }

  useEffect(() => {
    if(counter === 0){
      genResult()
      setCounter(60)
    }
  }, [counter, setCounter])

  const joinGreen = (value) => {
    if(counter > 30 || !applyBetSuccess){
      if(value !== -1){
        setBetApplyOn("Join Green " + value)
      }else{
        setBetApplyOn("Join Green")
      }
      setBetColor("green")
      setSColor("green")
      setApplyBet(!applyBet)
    }
  }

  const joinRed = (value) => {
    if(counter > 30 || !applyBetSuccess){
      if(value !== -1){
        setBetApplyOn("Join Red " + value)
      }else{
        setBetApplyOn("Join Red")
      }
      setBetColor("red")
      setSColor("red")
      setApplyBet(!applyBet)
    }
  }
  
  const joinViolet = (value) => {
    if(counter > 30 || !applyBetSuccess){
      if(value !== -1){
        setBetApplyOn("Join Violet " + value)
      }else{
        setBetApplyOn("Join Violet")
      }
      setBetColor("violet")
      setSColor("violet")
      setApplyBet(!applyBet)
    }
  }

  useEffect(() => {
    if(counter < 30){
      setApplyBet(false)
    }
  }, [counter])
  
  return (
    <div className="home-container">
      <div className="home-content">
        <ShowBalance setGetUser={setGetUser}/>
        <div className="period-countdown">
          <div className="home-period-count-key">
            <span>period</span>
            <span>count down</span>
          </div>
          <div className="home-period-count-value">
            <span>{gameData && gameData.user && gameData.user.period}</span>
            <span>{formatCounter()}</span>
          </div>
        </div>
        <div className="home-join">
          <button className='green' onClick={()=>joinGreen(-1)}>join green</button>
          <button className='violet' onClick={()=>joinViolet(-1)}>join violet</button>
          <button className='red' onClick={()=>joinRed(-1)}>join red</button>
        </div>
        <div className="home-numbers">
          <div className="0 red-violet" onClick={()=>joinViolet(0)}>0</div>
          <div className="1 green" onClick={()=>joinGreen(1)}>1</div>
          <div className="2 red" onClick={()=>joinRed(2)}>2</div>
          <div className="3 green" onClick={()=>joinGreen(3)}>3</div>
          <div className="4 red" onClick={()=>joinRed(4)}>4</div>
          <div className="5 green-violet" onClick={()=>joinViolet(5)}>5</div>
          <div className="6 red" onClick={()=>joinRed(6)}>6</div>
          <div className="7 green" onClick={()=>joinGreen(7)}>7</div>
          <div className="8 red" onClick={()=>joinRed(8)}>8</div>
          <div className="9 green" onClick={()=>joinGreen(9)}>9</div>
        </div>
        <h1 className='result-hed'>Results</h1>
        <div className="result-table">
          <table>
            <tr>
              <th>Period</th>
              <th>Price</th>
              <th>Number</th>
              <th>Result</th>
            </tr>
            {
              gameData && gameData.user && gameData.user.results && gameData.user.results.map((item, index) => {
                if(index > 6 || item.period === undefined){
                  return
                }
                return (
                  <tr key={index}>
                    <td>{item.period}</td>
                    <td>{item.price}</td>
                    <td>{item.number}</td>
                    <td className='ball'><div className={item.color === 'red' ? 'red-ball' : item.color === 'green' ? 'green-ball' : 'violet-ball'}></div></td>
                  </tr>
                )
              })
            }
          </table>
        </div>
      </div>
      {
        applyBet &&
        <Bet counter={counter} setApplyBetSuccess={setApplyBetSuccess} betAmount={betAmount} setBetAmount={setBetAmount} applyBetOn={applyBetOn} color={scolor} setApplyBet={setApplyBet} />
      }
    </div>
  )
}

export default Home