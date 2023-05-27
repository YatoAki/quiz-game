import {combineReducers, Reducer} from "redux"
import { QuizState, quizReducer } from './quizReducer';
import { UserState, userReducer } from './userReducer';

export interface RootState {
    quizReducer: QuizState,
    userReducer: UserState,
}

export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
    quizReducer: quizReducer,
    userReducer: userReducer
})
