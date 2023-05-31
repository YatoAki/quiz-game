
import React from "react";
import {useState, useEffect} from "react"
import dataFile from "../data.json"
import { useDispatch } from "react-redux";
import { setQuestion,setDuration, setNo, setChoices, setCorrectAnswer, increaseScore, increaseTotalDuration, startQuiz, finishQuiz, resetScore, resetTotalDuration} from "../actions";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { ChoicesState } from "../reducers/quizReducer";
import { useNavigate } from "react-router-dom";
import "./QSection.css"

interface Choice {
  id: string;
  value: string;
}

interface Question {
  id: string;
  question: string;
  choices: Choice[];
  correct_answer: string;
}


const QSection: React.FC = () => {

    const [length, setLength] = useState<number>(0)
    const [currentQuestion, setCurrentQuestion ] = useState<number>(0)
    const questionData = useSelector((state:RootState) => state.quizReducer )
    const userData = useSelector((state: RootState) => state.userReducer)
    const [delay, setDelay] = useState<boolean>(false)
    const [questionList, setQuestionList] = useState<Question []>(dataFile)

    const dispatch = useDispatch()
    const navigator = useNavigate()
    
    const shuffleArray = (array: any[]) => {
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    };

    // Fetch the data from data.json
    useEffect(()=> {
        setQuestionList(shuffleArray(questionList))
        setLength(dataFile.length)
        dispatch(startQuiz())
        dispatch(resetScore())
        dispatch(resetTotalDuration())
        // eslint-disable-next-line
    },[])

    // Setup data for each question
    useEffect(()=> {
        dispatch(setQuestion(questionList[currentQuestion].question))
        dispatch(setNo(currentQuestion))
        dispatch(setDuration(10))
        dispatch(setChoices(questionList[currentQuestion].choices))
        dispatch(setCorrectAnswer(questionList[currentQuestion].correct_answer))
        // eslint-disable-next-line
    },[currentQuestion])

    useEffect(() => {
    }, [questionData]);

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
        if (questionData.duration <= 0 && userData.isQuiz) {
          handleQuestionSkip();
        }
        // eslint-disable-next-line
    }, [questionData]);
      
    
    const handleQuestionSkip = () => {
        dispatch(increaseTotalDuration(questionData.duration));
        if (currentQuestion < length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          dispatch(finishQuiz())
          navigator("/result");
        }
    };

    const handleAnswer = (e: React.MouseEvent<HTMLLIElement>) => {
        if (delay) {
          return;
        }
        const targetElement = e.target as HTMLLIElement;
        const liElement = targetElement.closest('li');
      
        if (liElement) {
          const secondSpan = liElement.querySelector('span:nth-child(2)');
      
          if (secondSpan) {
            if (liElement.getAttribute("data-key") === questionData.correctAnswer) {
              secondSpan.textContent = "😎";
              liElement.classList.add("true");
              dispatch(increaseScore());
            } else {
              secondSpan.textContent = "😖";
              liElement.classList.add("false");
            }
          }
          dispatch(increaseTotalDuration(questionData.duration));
          setDelay(true);
          setTimeout(() => {
            if (currentQuestion < length - 1) {
              setCurrentQuestion(currentQuestion + 1);
            } else {
              dispatch(finishQuiz())
              navigator("/result");
            }
            setDelay(false);
          }, 500);
        }
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