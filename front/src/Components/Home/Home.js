import React from "react"
import "./Home.css"
import { Link, useNavigate } from "react-router-dom"

const Home = () => {

const navigate =useNavigate();

    return (
        <div className="homepage">
            <h1>Bem-vindo, jogue e compartilhe com frineds para obter dinheiro instantâneo</h1>
            <div className="button" onClick={() => (navigate("/"))} >Sair</div>
            <div className="button"  > <Link style={{color:'white',textDecoration:'none'}} to='https://www.crazygames.com/'>jogo para ganhar dinheiro</Link></div>
        </div>
    )
}

export default Home
