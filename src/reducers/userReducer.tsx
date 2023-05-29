export interface UserState {
    name: string | null;
    score: number;
    duration: number;
    isQuiz: boolean;
}
  
export interface SetNameAction {
    type: 'setName';
    payload: string | null;
}
  
export interface ResetScoreAction {
    type: 'resetScore';
}
  
export interface ResetTotalDurationAction {
    type: 'resetTotalDuration';
}

export interface IncreaseTotalDurationAction{
    type:"increaseTotalDuration";
    payload: number;
}

export interface IncreaseScoreAction{
    type: 'increaseScore';
}

export interface startQuizAction{
  type: 'startQuiz'
}

export interface finishQuizAction{
  type: 'finishQuiz'
}
  
type UserAction = SetNameAction | ResetScoreAction | ResetTotalDurationAction | IncreaseTotalDurationAction | IncreaseScoreAction | finishQuizAction | startQuizAction;
  
export const userReducer = (state: UserState = { name: null, score: 0, duration: 0, isQuiz: false }, action: UserAction): UserState => {
    switch (action.type) {
      case 'setName':
        return {
          ...state,
          name: action.payload,
        };
      case 'resetScore':
        return {
          ...state,
          score: 0,
        };
      case 'resetTotalDuration':
        return {
          ...state,
          duration: 0,
        };
      case 'increaseTotalDuration':
        return{
          ...state,
          duration: (10 - action.payload) + state.duration
        }
      case 'increaseScore':
        return{
          ...state,
          score: state.score + 1
        }
      case 'startQuiz':
        return{
          ...state,
          isQuiz: true
        }
      case 'finishQuiz':
        return{
          ...state,
          isQuiz: false
        }
      default:
        return state;
    }
};
