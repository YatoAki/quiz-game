import React from "react";
import "./Result.css"
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import html2canvas from "html2canvas";

interface CustomStyle extends React.CSSProperties {
    "--value": number;
  }
const Result: React.FC = () => {

    const userData = useSelector((state: RootState) => state.userReducer)

    const handleSave = (): void => {
        const element: HTMLElement | null = document.getElementById("card");
        if (element) {
          html2canvas(element, {
            scale: 4,
            useCORS: true
          }).then(canvas => {
            const fileName: string = "Quiz Achievement";
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
                        <div className="radial-progress bg-[var(--primaryColor)] text-[var(--white)] border-4 border-[var(--primaryColor)]" style={{ "--value": userData.score*10} as CustomStyle}>{userData.score}/10</div>
                        <h3>SCORE</h3>
                    </div>
                    <div className="timeProgress">
                    <div className="radial-progress bg-[var(--primaryColor)] text-[var(--white)] border-4 border-[var(--primaryColor)]" style={{ "--value": userData.duration } as CustomStyle}>{userData.duration}s</div>
                        <h3>TIME</h3>
                    </div>
                </div>
                <p>Thanks for taking part in our amazing quiz!</p>
            </div>
            <div className="controls">
                <button onClick={handleSave}>Save as image</button>
                <button>Retake the Quiz</button>
            </div>
            
        </div>
    )
}

export default Result