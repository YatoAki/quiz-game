
import React from "react";
import {useState, useEffect} from "react"
import dataFile from "../data.json"
import { useDispatch } from "react-redux";
import { setQuestion,setDuration, setNo, setChoices, setCorrectAnswer } from "../actions";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { ChoicesState } from "../reducers/quizReducer";
import { useNavigate } from "react-router-dom";
import "./QSection.css"


const QSection: React.FC = () => {

    const [length, setLength] = useState<number>(0)
    const [currentQuestion, setCurrentQuestion ] = useState<number>(0)
    const questionData = useSelector((state:RootState) => state.quizReducer )
    const [delay, setDelay] = useState<boolean>(false)

    const dispatch = useDispatch()
    const navigator = useNavigate()

    // Fetch the data from data.json
    useEffect(()=> {
        setLength(dataFile.length)
    },[])

    // Setup data for each question
    useEffect(()=> {
        dispatch(setQuestion(dataFile[currentQuestion].question))
        dispatch(setNo(currentQuestion))
        dispatch(setDuration(10))
        dispatch(setChoices(dataFile[currentQuestion].choices))
        dispatch(setCorrectAnswer(dataFile[currentQuestion].correct_answer))
    },[currentQuestion, dispatch])

    // Start the timer
    useEffect(()=> {
        const timer = setTimeout(() => {
            dispatch(setDuration(questionData.duration-1))
        }, 1000);
      
        return () => {
            clearTimeout(timer);
        };
    },[questionData.duration, dispatch])

    useEffect(() => {
        if (questionData.duration < 0) {
          handleQuestionSkip();
        }
    }, [questionData.duration]);
      
    
    const handleQuestionSkip = () => {
        if (currentQuestion < length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          navigator("/result");
        }
    };

    const handleAnswer = (e: React.MouseEvent<HTMLLIElement>) => {
        if (delay) {
            return;
        }
        const targetElement = e.target as HTMLLIElement;
        const secondSpan = targetElement.querySelector('span:nth-child(2)');
      
        if (secondSpan){
            if (targetElement.getAttribute("data-key") === questionData.correctAnswer) {
                secondSpan.textContent = "😎";
                targetElement.classList.add("true");
            }else {
                secondSpan.textContent = "😖";
                targetElement.classList.add("false");
            }
        }
        setDelay(true)
        setTimeout(() => {
          if (currentQuestion < length - 1) {
            setCurrentQuestion(currentQuestion + 1);
          }else{
            navigator("/result")
          }
          setDelay(false)
        }, 500);
    };
      

    return(
        <div className="QSection">
            <div className="header">
                <h2>Question {questionData.no + 1}/{length}</h2>
                <p className="timer">{questionData.duration}</p>
            </div>
            <p className="question">{questionData.question}</p>
            <ul className="choices">
                {questionData.choices ? questionData.choices.map((data:ChoicesState, index:number) => {
                    return(
                        <li key={data.id} data-key={data.id} onClick={handleAnswer}><span>{index+1}. {data.value}</span> <span></span></li>
                    )
                }): null}
            </ul>
        </div>
    )
} 

export default QSection