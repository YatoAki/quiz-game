export interface UserState {
    name: string | null;
    score: number;
    duration: number;
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
  
type UserAction = SetNameAction | ResetScoreAction | ResetTotalDurationAction | IncreaseTotalDurationAction | IncreaseScoreAction;
  
export const userReducer = (state: UserState = { name: null, score: 0, duration: 0 }, action: UserAction): UserState => {
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
      default:
        return state;
    }
};
