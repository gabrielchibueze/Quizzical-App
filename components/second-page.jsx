import React, {useState, useEffect} from 'react'
import he from 'he'

function Second(props){
    const [allSelected, setAllSelected] = useState(false)
  
    const newQuiz = props.newQuestions.map((quiz, index) =>{
                return <div className='question-list' key={quiz.id}>
                        <h4 className='question-tittle'>{index+1}: {he.decode(quiz.question)}</h4>
                        <div className='question-answers' key={quiz.id}>                            
                            {quiz.all_answers.map(answer => (
                                <p
                                key={answer.answer_id}
                                className='answers'
                                onClick={() => props.selectAnswer(quiz.id, answer.answer_id)}
                                style={{backgroundColor: answer.isSelected? "#D6DBF5" : ""}}
                                >
                                {he.decode(answer.answer)}
                                </p>
                            ))}
                        </div>

                        </div>
            })

console.table(props.newQuestions)

    useEffect(()=>{
        // To ensure that all answers are selected before clicking on submit
        const isAllSelected = props.newQuestions.every(data => data.isSelected)
        if (isAllSelected ){
            setAllSelected(true)
        }
        else {
            setAllSelected(false)
        }

    }, [])
    return (
        <div className='second-page'>
            <h1 className='second-page-intro'>Test your ability to answer generic questions about life</h1>
            <div className='all-questions' >{newQuiz}</div>
            <button className='first-btn' 
            onClick={()=>{props.increaseID(2); props.saveAnswers()}}
            disabled={!allSelected}
            >Check your Level of Intelliegence</button>
        </div>
    )
}

export default Second