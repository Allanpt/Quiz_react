import { createContext, useReducer } from "react";
import questions from '../data/questions_complete' 

const STAGES = ["Start" ,"Category", "Playing", "End"]

const initialState = {
    gameStage: STAGES[0],
    questions,
    currentQuestion: 0,
    score: 0,
    selected: false,
    help: false,
    optionDeleted: false,
    optionToHide: null,
}

const quizReducer = (state, action) => {

    switch (action.type) {
        case "INICIAL_STATE":
            return initialState

        case "CHANGE_STATE":
            return {
                ...state,
                gameStage: STAGES[1],
                
            }
        case "CHOOSE_CATEGORY":
        
            let quizQuestion = null

            state.questions.forEach(question => {
                if(question.category === action.payload){
                    quizQuestion = question.questions
                }
            });
            return {
                ...state,
                questions: quizQuestion,
                gameStage: STAGES[2]
            }

        case "FINAL_STATE":
            return {
                ...state,
                gameStage: STAGES[3],
                
            }
        case "RIGHT_QUESTION":
            const upScore = state.score + 1
            return {
                ...state,
                score: upScore,
                
            }
        case "CHANGE_SELECTED_TRUE":
            return {
                ...state,
                selected: true,
            }
        case "CHANGE_SELECTED_FALSE":
            return {
                ...state,
                selected: false,
            }
        

        case "REORDER_QUESTIONS":
            const reorderedQuestions = state.questions.sort(() => {
                return Math.random() - 0.5
            });
            return {
                ...state,
                questions: reorderedQuestions,
            }

        case "NEXT_QUESTIONS":
            const nextQuestion = state.currentQuestion + 1;

            return {
                ...state,
                currentQuestion: nextQuestion,
            }
        case "SHOW_TIP":

            return {
                ...state,
                help: true,
            }
        case "HIDE_TIP":

            return {
                ...state,
                help: false,
            }
        case "DELETE_OPTION":

            return {
                ...state,
                optionDeleted: true,
            }
        case "DELETE_OPTION_RETURNS":

            return {
                ...state,
                optionDeleted: false,
            }

        default:
            return state
    }
}

export const QuizContext = createContext()

export const QuizProvider = ({children}) => {
    const value = useReducer(quizReducer, initialState)

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}