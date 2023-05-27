
import React from "react";
import {useState, useEffect} from "react"
import dataFile from "../data.json"
import { useDispatch } from "react-redux";
import { setQuestion,setDuration, setNo } from "../actions";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

type Choice = {
    id: string;
    value: string;
};
  
type Question = {
    id: string;
    question: string;
    choices: Choice[];
    correct_answer: string;
};

type QuestionData = Question[];
  

const QSection: React.FC = () => {

    const [data, setData] = useState<QuestionData | null>()
    const [currentQuestion, setCurrentQuestion ] = useState<number>(0)
    const questionData = useSelector((state:RootState) => state.quizReducer )

    const dispatch = useDispatch()

    useEffect(()=> {
        console.log(dataFile)
        setData(dataFile)
    },[])

    useEffect(()=> {
        dispatch(setQuestion(dataFile[currentQuestion].question))
        dispatch(setNo(currentQuestion))
        dispatch(setDuration(60))
        
    },[currentQuestion])

    useEffect(()=> {
        const timer = setTimeout(() => {
            dispatch(setDuration(questionData.duration-1))
        }, 1000);
      
        return () => {
            clearTimeout(timer);
        };
    },[questionData.duration])

    return(
        <div>
            <span>{questionData.duration}</span>
            <h1>{questionData.question}</h1>
            <button onClick={() => setCurrentQuestion(currentQuestion+1)}>Next</button>
        </div>
    )
} 

export default QSection