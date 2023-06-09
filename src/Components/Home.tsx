import React from "react";
import "./Home.css"
import { setName } from "../actions/index";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [username,setUsername] = useState("")
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handleStart = () => {
        if (username){
            dispatch(setName(username))
            navigate("/questions")
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          handleStart();
        }
    };
    
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
                    onKeyDown={handleKeyPress}
                />
                <button onClick={handleStart}>START</button>
            </div>
        </div>
    )
}

export default Home