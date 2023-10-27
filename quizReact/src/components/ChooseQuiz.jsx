
import { useContext } from 'react'
import { QuizContext } from '../context/quiz'

import CategoryImg from '../img/category.svg'

import './ChooseQuiz.css'


function ChooseQuiz() {

const [quizState , dispatch] = useContext(QuizContext)

const chooseCategory = (category) => {

    dispatch({ type: "CHOOSE_CATEGORY", payload: category})
    dispatch({type: "REORDER_QUESTIONS"})

}

  return (
    <div id='choose-quiz'>
        <h2>Escolha uma categoria</h2>
        <p>As perguntas serão referentes a uma das linguagens abaixo:</p>
        <div id="quizes">
            {quizState.questions.map((question) => (
                <button onClick={() => chooseCategory(question.category)} key={question.category}>{question.category}</button>
            ))}
        </div>
        <img src={CategoryImg} alt="Escolha da categoria" />
    </div>
  )
}

export default ChooseQuiz