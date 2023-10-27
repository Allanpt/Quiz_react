import { useContext } from 'react'
import { QuizContext } from '../context/quiz'


import './Question.css'

function Question() {

    const [quizState , dispatch] = useContext(QuizContext)
    const currentQuestion = quizState.questions[quizState.currentQuestion]

    
    
    const selectedOption = (e) => {
      const pValue = e.target.innerText ;
      const element = e.target
      const allElements = Array.from(element.parentNode.children);

      
      
      if(pValue == currentQuestion.answer && !(quizState.selected)){
        dispatch({type: "RIGHT_QUESTION"})
      
      }
      if(pValue !== currentQuestion.answer && !(quizState.selected)){
        element.classList.add('wrong')
      
      }
      
      dispatch({type: "CHANGE_SELECTED_TRUE"})

      allElements.forEach(e => { 
        if(e.innerText === currentQuestion.answer) {
          e.classList.add('correct')
      }})
    }

    const cleanClassesNames = () => {
      const optionDiv = document.querySelector('.option')
      const allElements = optionDiv.querySelectorAll('p')
      
      allElements.forEach(elemento => {
        elemento.classList = ''
      });
    }

    const hideFalseOption = () => {
      const optionDiv = document.querySelector('.option')
      const allElements = optionDiv.querySelectorAll('p')
      
      let loop = true

      allElements.forEach(elemento => {
        if(elemento.innerText !== currentQuestion.answer && loop){
          elemento.classList.add('hide')
          loop = false
        }
      });
    }

  return (
    <div id='question'>
        <h3>Pergunta {quizState.currentQuestion + 1} de {quizState.questions.length}</h3>
        <h2>{currentQuestion.question}</h2>
        <div id="options-container">
            <div className="option">
              {currentQuestion.options.map((option) => (
                <p onClick={(e) => selectedOption(e)} key={option}>{option}</p>
              ))}
            </div>
        </div>
        
        <div id="btns">

          {!quizState.selected && (
            <>
              {currentQuestion.tip && !quizState.help && !quizState.optionDeleted && (
                <button onClick={() => dispatch({ type: "SHOW_TIP"})}>Dica</button>
              )}

              {quizState.help && (
                <p>{currentQuestion.tip}</p>
              )}            
            </>

          )}
          {!quizState.selected && !quizState.optionDeleted && !quizState.help && (
            <button onClick={() => {
              dispatch({ type: "DELETE_OPTION"});
              hideFalseOption()
            }}>Excluir uma</button>

          )}

          

          {quizState.currentQuestion + 1 !== quizState.questions.length && quizState.selected &&(
            <button onClick={() => {
              dispatch ({ type: "NEXT_QUESTIONS"});
              dispatch({ type: "CHANGE_SELECTED_FALSE" });
              dispatch({ type: "HIDE_TIP"});
              dispatch({ type: "DELETE_OPTION_RETURNS"});
              cleanClassesNames()
            }}>Continuar</button>
          )}
          {quizState.currentQuestion + 1 === quizState.questions.length && quizState.selected &&(
            <button onClick={() => {
              dispatch ({ type: "FINAL_STATE"});
              dispatch({ type: "CHANGE_SELECTED_FALSE" });
              dispatch({ type: "HIDE_TIP"});
              dispatch({ type: "DELETE_OPTION_RETURNS"});
              cleanClassesNames()
            }}>Continuar</button>
          )}
        </div>
        
    </div>
  )
}

export default Question