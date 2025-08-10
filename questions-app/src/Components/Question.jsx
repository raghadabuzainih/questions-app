import './css/Question.css'
import React from 'react'
import { Button } from './Button'

export const Question = (props) => {
    let [selectedIndex, setSelectedIndex] = React.useState(-1) 
    //in line 18 i used option.slice(0,1) because options stored like (A-...), (B-...)
    //and i want to take the first character & compare it with the correct answer
    let options = props.options.map((option, index) => {
        return <Button 
                    key={`${props.questionIndex}-${index}`}
                    class={`follow-q${props.questionIndex}`} 
                    value={option.slice(3)}
                    isResultActive={props.isResultActive}
                    isTrueAnswer={option == props.answer}
                    //if is result button active(clicked) --> false & true answers will colored(red & green)
                    //else --> when the result is not shown -> only selected answer will color blue
                    style={{backgroundColor: props.isResultActive ? 
                        (option.slice(0,1) == props.answer ? 'rgb(25, 110, 25)' : 'rgb(236, 87, 87)') : 
                        index == selectedIndex ? '#263581' : '#1a1a1a'}}
                    clickAnswer={() => handleClick(index, option)}
                >
                    {option}
                </Button>
    })

    function handleClick(index, option){
        console.log(index, option)
        setSelectedIndex(index)
        //get the sign like(A, B, ...)
        const selectedAnswer = option.slice(0, 1)
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