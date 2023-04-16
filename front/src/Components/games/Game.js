import React from 'react'
import "./games.css"
import { Link, useNavigate } from 'react-router-dom'

const Game = () => {
  let navigate = useNavigate();
  return (
      <div className="homepage">
            <h1>Thanks for joining us ,we welcome you here.</h1>

            <h1>Multiple games are available here that You can play now.</h1>
            <div className="button" > <Link style={{color:'white',textDecoration:'none'}} to='https://www.crazygames.com/'>Let's play</Link></div>
            
            <h1>Thousands of user's are already registered
              here..., And
            </h1>
            <h2>Over a Hundred  user's already get rewarded</h2>
            <div className="button" onClick={() => (navigate("/"))} >Log out</div>
        </div>

  )
}

export default Game