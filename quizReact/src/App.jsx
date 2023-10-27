// react, componentes, estáticos(css)


import { useContext, useEffect } from 'react'

import { QuizContext } from './context/quiz'
import Welcome from './components/Welcome'
import Question from './components/Question'
import GameOver from './components/GameOver'
import ChooseQuiz from './components/ChooseQuiz'


import './App.css'



function App() {

  const [quizState , dispatch] = useContext(QuizContext)

  return (
    <>
      <h1>Quiz de programação</h1>
      {quizState.gameStage === "Start" && <Welcome/>}
      {quizState.gameStage === "Category" && <ChooseQuiz/>}
      {quizState.gameStage === "Playing" && <Question/>}
      {quizState.gameStage === "End" && <GameOver/>}
    </>
  )
}

export default App
