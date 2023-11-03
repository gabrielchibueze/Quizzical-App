import React, { useEffect, useState } from 'react'
import './App.css'
import First from '/components/first-page.jsx'
import Second from '/components/second-page.jsx'
import Third from '/components/third-page.jsx'
import  { nanoid }  from 'nanoid'



function App() {
  const [newData, setNewData] = useState([])
  const [id, setId] = useState(0)
  const [mainData, setMainData] = useState([])

  
  // an async function that fetches the question data from API
  function refetchData (){
    async function fetchData (){
      const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setNewData(data.results)
    } 
    fetchData()
  }


  const increaseID = (num)=>{
    setId(num)
  }

  useEffect(()=>{
    // Function that shuffles the answers (including the coreect answer)

    function shuffleAnswerList (array){
      const randNum = Math.floor(Math.random() * array.length)
      for (let i=0; i < array.length; i++){
        [array[i], array[randNum]] = [array[randNum], array[i]]
      }
      return array
    }

    //  function that enlists all the answers ans answers unique IDs
    function sortAnswers(data) {
      const answers = data.incorrect_answers.map(answer => ({
        answer,
        isCorrect: false,
        answer_id: nanoid(),
        isSelected: false
      }));
    
      answers.push({
        answer: data.correct_answer,
        isCorrect: true,
        answer_id: nanoid(),
        isSelected: false
      });
      return shuffleAnswerList(answers);
    }
    
    //  Returning and appending the sorted answers and their unique IDs
      const mainDatas = newData.map(data =>{
        return ({...data,
          isSelected: false,
          id: nanoid(),
          all_answers: sortAnswers(data)
        })
      })
      setMainData(mainDatas)
  }, [newData])


  // Function to change the color of the selected 
  function flipSelected (questionId, answerId){
    setMainData(oldData => {
      const adjustedData = oldData.map(data =>{
        return data.id === questionId ? {...data, isSelected: true, 
            all_answers: data.all_answers.map(answer=>{
              return answer.answer_id === answerId ? {...answer, isSelected: true} : {...answer, isSelected: false}
            })
          } : data
        })
      return adjustedData
   })
  }
  function saveAnswers (){
    const allAnswers = JSON.stringify(mainData)
    localStorage.setItem("Answers", allAnswers)
  }

  return (
    <div className='page'>
      {(id === 0) && <First increaseID = {increaseID} launch={refetchData}/>}
      {(id === 1) && <Second newQuestions={mainData}
      selectAnswer ={flipSelected}
      increaseID = {increaseID}
      key={nanoid()}
      saveAnswers = {saveAnswers}
      />}
      {(id === 2) && <Third increaseID = {increaseID}/>}
      
    </div>
  )
}

export default App
