import '../css/App.css'
import {Question} from './Question'
import questions from '../data/questions.json'
import React from 'react'
import Confetti from "react-confetti"
import {Input} from './Input'
import { Button } from './Button'

export const App = () => {
  let [isShowResultActive, setIsShowResultActive] = React.useState(false)
  let [isAddButtonClicked, setIsAddButtonClicked] = React.useState(false)
  let [isSubmitNewClicked, setIsSubmitNewClicked] = React.useState(false)
  let [answers, setAnswers] = React.useState([])
  let questionsRef = React.useRef(null)
  let addFormRef = React.useRef(null)
  let correctAnswers = answers.filter(obj => Object.values(obj)[0] == true).length
  let [isResultClicked, setIsResultClicked] = React.useState(false)

  let allQuestions = JSON.parse(localStorage.getItem('questions')) ? JSON.parse(localStorage.getItem('questions')) : questions
  
  function setQuestions(questions){
    localStorage.setItem('questions', JSON.stringify(questions))
  }

  const listOfQuestions = allQuestions.map((x, index) => {
    return <Question
              key={`question-${index}`}
              question={x.question}
              options={x.options}
              answer={x.answer}
              selectAnswer={updateAnswers}
              questionIndex={index}
              isResultActive={isShowResultActive}
            />
  })

  function updateAnswers(answer){
    //Object.keys(answer)[0] -> get an array which contains keys of the object
    //in this case -> answer has only one key and its value 
    //so the array length will be 1 --> this element is the key
    setAnswers(old => {
      //the newest version of array
      const questionIndex = old.findIndex((x) => Object.keys(x)[0] == Object.keys(answer)[0])
      if(questionIndex == -1) return [...old, answer] //if it's not exist
      else{
        //index = questionIndex => replace
        return old.map((x, index) => index == questionIndex ? answer : x)
      }
    })
  }
  
  function showResult(){
    setIsShowResultActive(true)
    setIsResultClicked(true)
  }

  function handleAdd(){
    setIsAddButtonClicked(true)
  }

  function handleSubmission(e){
    e.preventDefault()
    const question = addFormRef.current.question.value
    const answer0 = addFormRef.current.answer0.value
    const answer1 = addFormRef.current.answer1.value
    const answer2 = addFormRef.current.answer2.value
    const answer3 = addFormRef.current.answer3.value
    const correctAnswer = addFormRef.current.correctAnswer.value
    console.log(question, answer0)

    if(!question || !answer0 || !answer1 || !answer2 || !answer3 || !correctAnswer){
        alert('please fill all the required fields')
        return
      }else{
        const newQuestion = {
          'question': question,
          'options' : [`A- ${answer0}`, `B- ${answer1}`, `C- ${answer2}`, `D- ${answer3}`],
          'answer' : correctAnswer
        }
        allQuestions = [...allQuestions, newQuestion]
        setQuestions(allQuestions)
        setIsSubmitNewClicked(true)
        setIsAddButtonClicked(false)
      }
  }

  function handleCancel(){
    setIsAddButtonClicked(false)
    setIsSubmitNewClicked(false)
  }

  const signs = ['A- ', 'B- ', 'C- ', 'D-']

  let options = new Array(4).fill(0).map((x, index)=> 
    <div key={`div-${index}`} className='option'>
      {signs[index]}
      <Input key={`input-${index}`} id="answers" name={`answer${index}`} required={true}/>
    </div>
  )

  return(
    <div>
      <header><h1 className='app-title'>Questions App</h1></header>
      <Button class='add-button' value='+' onAdd={handleAdd}/>
      <div ref={questionsRef} className='questions'>
        {listOfQuestions}
      </div>
      <Button class='show-result' value='Click To See The Result' onShowResult={showResult}/>
      <p style={{display: isShowResultActive ? 'block' : 'none'}}>You've got {correctAnswers}/{allQuestions.length}</p>
      {correctAnswers == allQuestions.length && isResultClicked && 
      <><p>Congratulations!</p><Confetti style={{height: '340%', width: '100%'}}/></>}
      <div className="blur" style={{display: isAddButtonClicked ? (isSubmitNewClicked ? 'none' : 'block') : 'none'}}></div>
    <form className="add-form" method="get" ref={addFormRef} style={{display: isAddButtonClicked ? (isSubmitNewClicked ? 'none' : 'block') : 'none'}}>
         <div className="label-input">
                <label htmlFor="question">Question</label>
                <Input key={`input-${4}`} id="question" name="question" required={true}/>
        </div>
        <div className="label-input">
            <label htmlFor="answers">Answers</label>
            {options}
        </div>
        <div className="label-input">
            <label htmlFor="correct-answer">Correct Answer (A or B or C or D)</label>
            <Input key={`input-${5}`} id="correct-answer" name="correctAnswer" required={true}/>
        </div>
        <div className="confirm-alert">
          <Button class='submit-new-question' value='Add New Question' onSubmitNew={handleSubmission}/>
          <Button class='cancel' value='Cancel' onCancel={handleCancel}/>
        </div>
    </form>
    </div>
  )

}