import {combineReducers, Reducer} from "redux"
import { QuizState, quizReducer } from './quizReducer';
import { UserState, userReducer } from './userReducer';

interface RootState {
    quizReducer: QuizState,
    userReducer: UserState,
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
    quizReducer: quizReducer,
    userReducer: userReducer
})

export default rootReducer