import React from 'react'
import "./Loader.css"
import ball from './ball.gif'

const Loader = () => {
  return (
    <div className="loader-container">
        <div className="loader">
            <img src={ball} alt='loader' />
        </div>
    </div>
  )
}

export default Loader
