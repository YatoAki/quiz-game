import React from "react";
import "./Home.css"
import { setName } from "../actions/index";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Home: React.FC = () => {

    const dispatch = useDispatch();
    const [username,setUsername] = useState("")
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handleStart = () => {
        if (username){
            dispatch(setName(username))
        }
    }
    
    return(
        <div className="Home">
            <h1>Quiz Game</h1>
            <div className="centerIcon">🎲</div>
            <p>
                Play Now and Unleash <br/> Your Inner Quiz Master!
            </p>
            <div className="inputArea">
                <input 
                    type="text" 
                    placeholder="Enter your name" 
                    value={username}
                    onChange={handleInputChange}
                />
                <button onClick={handleStart}>START</button>
            </div>
        </div>
    )
}

export default Home