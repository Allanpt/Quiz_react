import { useContext } from 'react'
import { QuizContext } from '../context/quiz'

import ImgGameOver from '../img/welldone.svg'

import './GameOver.css'

function GameOver() {

    const [quizState , dispatch] = useContext(QuizContext)

  return (
    <div id='game-over'>
        <h2>Fim de jogo!</h2>
        <p>Pontuação: {quizState.score}</p>
        <p>Você acertou {quizState.score} de {quizState.questions.length} perguntas.</p>
        <img src={ImgGameOver} alt="" />
        <button onClick={() => dispatch ({ type: "INICIAL_STATE"})}>Reiniciar</button>
    </div>
  )
}

export default GameOver