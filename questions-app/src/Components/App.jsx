import './css/App.css'
import {Question} from './Question'
import questions from '../questions.json'
import React from 'react'
import Confetti from "react-confetti"

// const app=>(         arrow function 
//folders
//button -> component , input -> componoent
//why choose vite & its problems
// export const App = () => { 

// }
//use ref & use State اقرا عنهم 

export const App = () => {
  let [answers, setAnswers] = React.useState([])
  let questionsRef = React.useRef(null)
  let resultRef = React.useRef(null)
  let addFormRef = React.useRef(null)
  let blurDiv = React.useRef(null)
  let cancelRef = React.useRef(null)
  let correctAnswers = answers.filter(obj => Object.values(obj)[0] == true).length
  let [isResultClicked, setIsResultClicked] = React.useState(false)

  let allQuestions = JSON.parse(localStorage.getItem('questions')) ? JSON.parse(localStorage.getItem('questions')) : questions
  console.log(correctAnswers, allQuestions.length , allQuestions)
  
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
    //
    resultRef.current.style.display ='block'
    setIsResultClicked(true)
    //button --> listner
    questionsRef.current.querySelectorAll('button').forEach(button => {
      button.disabled = true
      button.style.cursor = 'not-allowed'
      if(allQuestions.find((x,index) => x.answer == button.textContent && index == button.className) == undefined){
        button.style.backgroundColor = 'rgb(236, 87, 87)'
      }
      else button.style.backgroundColor = 'rgb(25, 110, 25)'
    })
  }

  function handleAdd(){
    addFormRef.current.style.display = 'block'
    blurDiv.current.style.display = 'block'
  }

  function handleSubmission(){
    const question = addFormRef.current.question.value
    const answer1 = addFormRef.current.answer1.value
    const answer2 = addFormRef.current.answer2.value
    const answer3 = addFormRef.current.answer3.value
    const answer4 = addFormRef.current.answer4.value
    const correctAnswer = addFormRef.current.correctAnswer.value

    if(!question || !answer1 || !answer2 || !answer3 || !answer4 || !correctAnswer){
        alert('please fill all the required fields')
      }else{
        const newQuestion = {
          'question': question,
          'options' : [answer1, answer2, answer3, answer4],
          'answer' : correctAnswer
        }
        allQuestions = [...allQuestions, newQuestion]
        setQuestions(allQuestions)
        addFormRef.current.style.display = 'none'
        blurDiv.current.style.display = 'none'
      }
  }

  function handleCancel(){
    addFormRef.current.style.display = 'none'
    blurDiv.current.style.display = 'none'
  }

  return(
    <div>
      <header><h1 className='app-title'>Questions App</h1></header>
      <button className='add-button' onClick={handleAdd}>+</button>
      <div ref={questionsRef} className='questions'>
        {listOfQuestions}
      </div>
      <button type='submit' onClick={showResult}>Click To See The Result</button>
      <p ref={resultRef} style={{display: 'none'}}>You've got {correctAnswers}/{allQuestions.length}</p>
      {correctAnswers == allQuestions.length && isResultClicked && 
      <><p>Congratulations!</p><Confetti style={{height: '340%', width: '100%'}}/></>}
      <div className="blur" ref={blurDiv}></div>
    <form className="add-form" method="get" ref={addFormRef}>
         <div className="label-input">
                <label htmlFor="question">Question</label>
                <input id="question" type="text" name="question" required />
        </div>
        <div className="label-input">
            <label htmlFor="answers">Answers</label>
            <input id="answers" type="text" name="answer1" required />
            <input id="answers" type="text" name="answer2" required />
            <input id="answers" type="text" name="answer3" required />
            <input id="answers" type="text" name="answer4" required />
        </div>
        <div className="label-input">
            <label htmlFor="correct-answer">Correct Answer</label>
            <input id="correct-answer" type="text" name="correctAnswer" required />
        </div>
        <div className="confirm-alert">
            <button type="submit" className="submit-new-question" onClick={handleSubmission}>Add New Question</button>
            <button type="submit" className="cancel" ref={cancelRef} onClick={handleCancel}>Cancel</button>
        </div>
    </form>
    </div>
  )

}
// export default function App() {
//   let [answers, setAnswers] = React.useState([])
//   let questionsRef = React.useRef(null)
//   let resultRef = React.useRef(null)
//   let addFormRef = React.useRef(null)
//   let blurDiv = React.useRef(null)
//   let cancelRef = React.useRef(null)
//   let correctAnswers = answers.filter(obj => Object.values(obj)[0] == true).length
//   let [isResultClicked, setIsResultClicked] = React.useState(false)

//   let allQuestions = JSON.parse(localStorage.getItem('questions')) ? JSON.parse(localStorage.getItem('questions')) : questions
//   console.log(correctAnswers, allQuestions.length , allQuestions)
  
//   function setQuestions(questions){
//     localStorage.setItem('questions', JSON.stringify(questions))
//   }

//   const listOfQuestions = allQuestions.map((x, index) => {
//     return <Question
//               key={`question-${index}`}
//               question={x.question}
//               options={x.options}
//               answer={x.answer}
//               selectAnswer={updateAnswers}
//               questionIndex={index}
//             />
//   })

//   function updateAnswers(answer){
//     //Object.keys(answer)[0] -> get an array which contains keys of the object
//     //in this case -> answer has only one key and its value 
//     //so the array length will be 1 --> this element is the key
//     setAnswers(old => {
//       //the newest version of array
//       const questionIndex = old.findIndex((x) => Object.keys(x)[0] == Object.keys(answer)[0])
//       if(questionIndex == -1) return [...old, answer] //if it's not exist
//       else{
//         //index = questionIndex => replace
//         return old.map((x, index) => index == questionIndex ? answer : x)
//       }
//     })
//   }
  
//   function showResult(){
//     //
//     resultRef.current.style.display ='block'
//     setIsResultClicked(true)
//     //button --> listner
//     questionsRef.current.querySelectorAll('button').forEach(button => {
//       button.disabled = true
//       button.style.cursor = 'not-allowed'
//       if(allQuestions.find((x,index) => x.answer == button.textContent && index == button.className) == undefined){
//         button.style.backgroundColor = 'rgb(236, 87, 87)'
//       }
//       else button.style.backgroundColor = 'rgb(25, 110, 25)'
//     })
//   }

//   function handleAdd(){
//     addFormRef.current.style.display = 'block'
//     blurDiv.current.style.display = 'block'
//   }

//   function handleSubmission(){
//     const question = addFormRef.current.question.value
//     const answer1 = addFormRef.current.answer1.value
//     const answer2 = addFormRef.current.answer2.value
//     const answer3 = addFormRef.current.answer3.value
//     const answer4 = addFormRef.current.answer4.value
//     const correctAnswer = addFormRef.current.correctAnswer.value

//     if(!question || !answer1 || !answer2 || !answer3 || !answer4 || !correctAnswer){
//         alert('please fill all the required fields')
//       }else{
//         const newQuestion = {
//           'question': question,
//           'options' : [answer1, answer2, answer3, answer4],
//           'answer' : correctAnswer
//         }
//         allQuestions = [...allQuestions, newQuestion]
//         setQuestions(allQuestions)
//         addFormRef.current.style.display = 'none'
//         blurDiv.current.style.display = 'none'
//       }
//   }

//   function handleCancel(){
//     addFormRef.current.style.display = 'none'
//     blurDiv.current.style.display = 'none'
//   }

//   return(
//     <div>
//       <header><h1 className='app-title'>Questions App</h1></header>
//       <button className='add-button' onClick={handleAdd}>+</button>
//       <div ref={questionsRef} className='questions'>
//         {listOfQuestions}
//       </div>
//       <button type='submit' onClick={showResult}>Click To See The Result</button>
//       <p ref={resultRef} style={{display: 'none'}}>You've got {correctAnswers}/{allQuestions.length}</p>
//       {correctAnswers == allQuestions.length && isResultClicked && 
//       <><p>Congratulations!</p><Confetti style={{height: '340%', width: '100%'}}/></>}
//       <div className="blur" ref={blurDiv}></div>
//     <form className="add-form" method="get" ref={addFormRef}>
//          <div className="label-input">
//                 <label htmlFor="question">Question</label>
//                 <input id="question" type="text" name="question" required />
//         </div>
//         <div className="label-input">
//             <label htmlFor="answers">Answers</label>
//             <input id="answers" type="text" name="answer1" required />
//             <input id="answers" type="text" name="answer2" required />
//             <input id="answers" type="text" name="answer3" required />
//             <input id="answers" type="text" name="answer4" required />
//         </div>
//         <div className="label-input">
//             <label htmlFor="correct-answer">Correct Answer</label>
//             <input id="correct-answer" type="text" name="correctAnswer" required />
//         </div>
//         <div className="confirm-alert">
//             <button type="submit" className="submit-new-question" onClick={handleSubmission}>Add New Question</button>
//             <button type="submit" className="cancel" ref={cancelRef} onClick={handleCancel}>Cancel</button>
//         </div>
//     </form>
//     </div>
//   )
// }