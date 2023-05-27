export interface UserState {
    name: string | null;
    score: number;
    duration: number;
}
  
export interface SetNameAction {
    type: 'setName';
    payload: string | null;
}
  
export interface SetScoreAction {
    type: 'setScore';
    payload: number;
}
  
export interface SetTotalDurationAction {
    type: 'setTotalDuration';
    payload: number;
}
  
type UserAction = SetNameAction | SetScoreAction | SetTotalDurationAction;
  
export const userReducer = (state: UserState = { name: null, score: 0, duration: 0 }, action: UserAction): UserState => {
    switch (action.type) {
      case 'setName':
        return {
          ...state,
          name: action.payload,
        };
      case 'setScore':
        return {
          ...state,
          score: action.payload,
        };
      case 'setTotalDuration':
        return {
          ...state,
          duration: action.payload,
        };
      default:
        return state;
    }
};
