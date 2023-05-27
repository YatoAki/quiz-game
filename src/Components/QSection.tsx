
import React from "react";
import {useState, useEffect} from "react"
import dataFile from "../data.json"

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

    useEffect(()=> {
        setData(dataFile)
    },[])

    return(
        <div>
            
        </div>
    )
} 

export default QSection