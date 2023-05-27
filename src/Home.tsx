import React from "react";
import "./Home.css"

const Home: React.FC = () => {
    return(
        <div className="Home">
            <h1>Quiz Game</h1>
            <div className="centerIcon">🎲</div>
            <p>
                Play Now and Unleash <br/> Your Inner Quiz Master!
            </p>
            <div className="inputArea">
                <input type="text" placeholder="Enter your name" />
                <button>START</button>
            </div>
        </div>
    )
}

export default Home