import './css/Question.css'
import React from 'react'

export const Question = (props) => {
    let buttonRef = React.useRef([])
    let [selectedIndex, setSelectedIndex] = React.useState(-1) 
    let options = props.options.map((option, index) => {
        return <button className={props.questionIndex} 
                    key={`${props.questionIndex}-${index}`}
                    style={{backgroundColor: index == selectedIndex ? '#263581' : '#1a1a1a'}}
                    ref={(el)=> buttonRef.current[index] = el} 
                    onClick={()=> handleClick(index)}>{option}
                </button>
    })

    function handleClick(index){
        setSelectedIndex(index)
        const selectedAnswer = buttonRef.current[index].textContent
        //[props.questionIndex] because it's a variable
        //if we put it without brackets -> give error because(.)
        props.selectAnswer({[props.questionIndex] : selectedAnswer == props.answer})
        //after this line -> parent will rerender then this children will rerender
    }
    
    return(
        <div>
            <h2>{props.question}</h2>
            <h3>Select the answer:</h3>
            <div className="options">
                {options}
            </div>
        </div>
    )
}
// export default function Question(props){
//     let buttonRef = React.useRef([])
//     let [selectedIndex, setSelectedIndex] = React.useState(-1) 
//     let options = props.options.map((option, index) => {
//         return <button className={props.questionIndex} 
//                     key={`${props.questionIndex}-${index}`}
//                     style={{backgroundColor: index == selectedIndex ? '#263581' : '#1a1a1a'}}
//                     ref={(el)=> buttonRef.current[index] = el} 
//                     onClick={()=> handleClick(index)}>{option}
//                 </button>
//     })

//     function handleClick(index){
//         setSelectedIndex(index)
//         const selectedAnswer = buttonRef.current[index].textContent
//         //[props.questionIndex] because it's a variable
//         //if we put it without brackets -> give error because(.)
//         props.selectAnswer({[props.questionIndex] : selectedAnswer == props.answer})
//         //after this line -> parent will rerender then this children will rerender
//     }
    
//     return(
//         <div>
//             <h2>{props.question}</h2>
//             <h3>Select the answer:</h3>
//             <div className="options">
//                 {options}
//             </div>
//         </div>
//     )
// }