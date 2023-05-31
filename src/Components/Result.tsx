import React from "react";
import "./Result.css"
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import html2canvas from "html2canvas";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from "react-router";

const Result: React.FC = () => {

    const userData = useSelector((state: RootState) => state.userReducer)
    const navigate = useNavigate()

    const handleSave = (): void => {
        const element: HTMLElement | null = document.getElementById("card");
        if (element) {
          html2canvas(element, {
            scale: 4,
            useCORS: true
          }).then(canvas => {
            const fileName: string = "Quiz Achievement.png";
            canvas.toBlob(blob => {
              const file: File | null = new File([blob as Blob], fileName, { type: "image/png" });
              if (navigator.share && (navigator.platform === 'iPhone' || navigator.platform === 'iPad')) {
                navigator
                  .share({
                    files: [file as File],
                    title: fileName,
                    text: "Save this image to your gallery",
                  });
              } else {
                const link: HTMLAnchorElement = document.createElement("a");
                link.download = fileName;
                link.href = URL.createObjectURL(file as Blob);
                link.click();
              }
            });
          });
        }
      };

    const handleRetakeQuiz = () : void => {
        navigate("/questions")
    }
      

    return(
        <div className="Result">
            <h1>Quiz Game</h1>
            <p className="resultSubheading">You have completed the quiz!</p>
            <div id="card">
                <div className="cardHeader">
                    <h2>Congratulation!</h2>
                    <p>{userData.name}</p>
                </div>
                <div className="progressContainer">
                    <div className="scoreProgress">
                        <div>
                            <CircularProgressbar value={userData.score*10} text={`${userData.score}/10`} />
                        </div>
                        <h3>SCORE</h3>
                    </div>
                    <div className="timeProgress">
                        <div>
                            <CircularProgressbar value={userData.duration} text={`${userData.duration}s`} />
                        </div>
                        <h3>TIME</h3>
                    </div>
                </div>
                <p>Thanks for taking part in our amazing quiz!</p>
            </div>
            <div className="controls">
                <button onClick={handleSave}>Save as image</button>
                <button onClick={handleRetakeQuiz}>Retake the Quiz</button>
            </div>
            <a href="./">Back to home</a>
            
        </div>
    )
}

export default Result