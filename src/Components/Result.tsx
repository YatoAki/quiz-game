import React from "react";
import "./Result.css"
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

interface CustomStyle extends React.CSSProperties {
    "--value": number;
  }
const Result: React.FC = () => {

    const userData = useSelector((state: RootState) => state.userReducer)

    return(
        <div className="Result">
            <h1>Quiz Game</h1>
            <p>You have completed the quiz!</p>
            <div id="card">
                <div className="cardHeader">
                    <h2>Congratulation!</h2>
                    <p>{userData.name}</p>
                </div>
                <div className="progressContainer">
                    <div className="scoreProgress">
                        <div className="radial-progress bg-[var(--primaryColor)] text-[var(--white)] border-4 border-[var(--primaryColor)]" style={{ "--value": 70} as CustomStyle}>70%</div>
                        <h3>SCORE</h3>
                    </div>
                    <div className="timeProgress">
                    <div className="radial-progress bg-[var(--primaryColor)] text-[var(--white)] border-4 border-[var(--primaryColor)]" style={{ "--value": 70 } as CustomStyle}>70%</div>
                        <h3>TIME</h3>
                    </div>
                </div>
                <p>Thanks for taking part in our amazing quiz!</p>
            </div>
            <div className="controls">
                <button>Save as image</button>
                <button>Retake the Quiz</button>
            </div>
            
        </div>
    )
}

export default Result