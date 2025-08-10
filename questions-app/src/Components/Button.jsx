import React from "react"

export const Button = (props) => {
    const buttonRef = React.useRef(null)
    
    return(
        <button
            ref={buttonRef} 
            className={props.class}
            style={props.style}
            onClick={props.value == '+' ? props.onAdd : 
                    props.value == 'Click To See The Result' ? props.onShowResult :
                    props.value == 'Add New Question' ? props.onSubmitNew : 
                    props.value == 'Cancel' ? props.onCancel : props.clickAnswer}
        >
            {props.value}
        </button>
    )
}