

export interface ChoicesState{
    id: string;
    value: string;
}

export interface QuizState{
    no: number;
    question: string | null;
    duration: number;
    choices: ChoicesState[];
    correctAnswer:string | null;
}


export interface SetNoAction{
    type: "setNo";
    payload: number;
}

export interface SetQuestionAction{
    type: "setQuestion";
    payload: string | null;
}

export interface SetDurationAction{
    type: "setDuration";
    payload: number;
}

export interface SetChoicesAction{
    type: "setChoices";
    payload: ChoicesState[];
}

export interface SetCorrectAnswerAction{
    type: "setCorrectAnswer";
    payload: string;
}

type QuizAction = SetNoAction | SetQuestionAction | SetDurationAction | SetChoicesAction | SetCorrectAnswerAction;

export const quizReducer = (state: QuizState = {no:0 , question:null, duration:0, choices:[], correctAnswer: null}, action: QuizAction): QuizState => {
    switch(action.type){
        case "setNo":
            return{
                ...state,no: action.payload,
            }
        case "setQuestion":
            return{
                ...state,question: action.payload,
            }
        case "setDuration":
            return{
                ...state,duration: action.payload,
            }
        case "setChoices":
            return{
                ...state,choices: action.payload,
            }
        case "setCorrectAnswer":
            return{
                ...state, correctAnswer: action.payload
            }
        default:
            return state  
            
    }
} 
