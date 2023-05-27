
import React from "react";
import {useState, useEffect} from "react"
import dataFile from "../data.json"
import { useDispatch } from "react-redux";
import { setQuestion,setDuration, setNo, setChoices, setCorrectAnswer } from "../actions";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { ChoicesState } from "../reducers/quizReducer";

type Question = {
    id: string;
    question: string;
    choices: ChoicesState[];
    correct_answer: string;
};

type QuestionData = Question[];
  

const QSection: React.FC = () => {

    const [data, setData] = useState<QuestionData | null>()
    const [length, setLength] = useState<number | null>()
    const [currentQuestion, setCurrentQuestion ] = useState<number>(0)
    const questionData = useSelector((state:RootState) => state.quizReducer )

    const dispatch = useDispatch()

    // Fetch the data from data.json
    useEffect(()=> {
        setData(dataFile)
        setLength(dataFile.length)
    },[])

    // Setup data for each question
    useEffect(()=> {
        dispatch(setQuestion(dataFile[currentQuestion].question))
        dispatch(setNo(currentQuestion))
        dispatch(setDuration(60))
        dispatch(setChoices(dataFile[currentQuestion].choices))
        dispatch(setCorrectAnswer(dataFile[currentQuestion].correct_answer))
    },[currentQuestion])

    // Start the timer
    useEffect(()=> {
        const timer = setTimeout(() => {
            dispatch(setDuration(questionData.duration-1))
        }, 1000);
      
        return () => {
            clearTimeout(timer);
        };
    },[questionData.duration])

    return(
        <div className="QSection">
            <div className="header">
                <h2>Question {questionData.no}/{length}</h2>
                <div className="timer">{questionData.duration}</div>
            </div>
            <h3>{questionData.question}</h3>
            <ul>
                {questionData.choices ? questionData.choices.map((data:ChoicesState) => {
                    return(
                        <li key={data.id}>{data.value}</li>
                    )
                }): null}
            </ul>
            <h4>{questionData.correctAnswer}</h4>
            <button onClick={()=> setCurrentQuestion(currentQuestion+1)}>Next</button>
        </div>
    )
} 

export default QSection