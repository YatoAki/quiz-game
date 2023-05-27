import { SetNoAction, SetQuestionAction, SetDurationAction, SetChoicesAction, ChoicesState, SetCorrectAnswerAction } from '../reducers/quizReducer';
import { SetNameAction, SetScoreAction, SetTotalDurationAction } from '../reducers/userReducer';

export const setNo = (no: number): SetNoAction => ({
  type: 'setNo',
  payload: no,
});

export const setQuestion = (question: string | null): SetQuestionAction => ({
  type: 'setQuestion',
  payload: question,
});

export const setDuration = (duration: number): SetDurationAction => ({
  type: 'setDuration',
  payload: duration,
});

export const setChoices = (choices: ChoicesState[]): SetChoicesAction => ({
  type: 'setChoices',
  payload: choices,
});

export const setCorrectAnswer = (correctAnswer: string): SetCorrectAnswerAction => ({
  type: 'setCorrectAnswer',
  payload: correctAnswer,
});

export const setName = (name: string | null): SetNameAction => ({
  type: 'setName',
  payload: name,
});

export const setScore = (score: number): SetScoreAction => ({
  type: 'setScore',
  payload: score,
});

export const SetTotalDuration = (duration: number): SetTotalDurationAction => ({
  type: 'setTotalDuration',
  payload: duration,
});