import React from "react"
import "./Home.css"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"

const Home = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    console.log(state);
    return (
     

        <div className="panel">

            <img
                className="panel__avatar"
                src={state.picture.data.url}
                alt="Profile"
            />


            <div className="inputs">
                <h3>Welcome, {state.name}</h3>
                <div className="inputs__item inputs__item--new">
                    <strong><span>Name :</span></strong><span style={{ marginLeft: "50px" }}>{state.name}</span>
                </div>
                <div className="inputs__item inputs__item--new">
                    <strong> <span>Email :</span></strong><span style={{ marginLeft: "50px" }}>{state.email}</span>
                </div>

                <div className="inputs__item inputs__item--cta">
                    <strong>Note:</strong><p>Is that you ? verify by clicking  here</p>
                    <button className="btn" onClick={
                        ()=>{
                            navigate('/verify')
                        }
                    } >verify</button>
                </div>
            </div>


        </div>
    )
}

export default Home
