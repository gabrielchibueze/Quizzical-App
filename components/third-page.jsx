import React, { useState } from 'react'
import he from 'he'

function Third(props){
    const savedAnswers = localStorage.getItem("Answers")
    const retrievedAnswers = JSON.parse(savedAnswers)
    
    // retrieval from local storage
    function retrieveAnswers (){
        const quizResult = retrievedAnswers.map((quiz, index) =>{
            return <div className='question-list' key={quiz.id}>
                    <h4 className='question-tittle'>{index+1}:  {he.decode(quiz.question)}</h4>
                    <div className='question-answers' key={quiz.id}>                            
                        {quiz.all_answers.map(answer => (
                            <p
                            key={answer.answer_id}
                            className='answers'
                            style={ answer.isSelected? {backgroundColor: answer.isCorrect ? "#94D7A2" : "#F8BCBC"} : {backgroundColor: answer.isCorrect? "#94D7A2" :  ""}}
                            >
                            {he.decode(answer.answer)}
                            </p>
                        ))}
                    </div>

                    </div>
        })
        return quizResult
    }

    // to sort the sort incorrect answers from correct answers to determine the user's score
    const inCorrectAnswerArray = []
    function totalCorrectAnswers (){
        const answeredInCorrectly = retrievedAnswers.map(data =>{
            const inCorrectAnswers = data.all_answers.filter(items =>{
                return items.isSelected && !items.isCorrect
            })
            inCorrectAnswerArray.push(inCorrectAnswers)
            return inCorrectAnswers
        })
        return answeredInCorrectly
    }
    totalCorrectAnswers()
    // To only return the lenght of incorrect answer array in the data
    const refAnswers = inCorrectAnswerArray.filter(arr => arr.length > 0)

    return (
        <div className='second-page'>
            <p className='results'>Hurray!!! Your Test Result is Out (You Scored: {retrievedAnswers.length - refAnswers.length} / {retrievedAnswers.length})</p>
            <div className='all-questions' >{retrieveAnswers()}</div>
            
            <button className='first-btn'
            onClick={()=>props.increaseID(0)}
            >New Quizzical</button>
        </div>
    )
}

export default Third