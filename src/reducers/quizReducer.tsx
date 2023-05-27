
export interface QuizState{
    no: number;
    question: string | null;
    duration: number;
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

type QuizAction = SetNoAction | SetQuestionAction | SetDurationAction;

export const quizReducer = (state: QuizState = {no:0 , question:null, duration:0}, action: QuizAction): QuizState => {
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
        default:
            return state  
            
    }
} 
