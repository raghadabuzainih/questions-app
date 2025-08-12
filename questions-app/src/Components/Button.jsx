export const Button = (props) => {
    let values = ['+', 'Click To See The Result', 'Add New Question', 'Cancel']
    //another values -> values of options(answers)

    return(
        <button
            className={props.class}
            style={props.style}
            disabled={!values.includes(props.value) ? 
                        (props.isResultActive ? true : false) : false
                     }
            onClick={props.value == values[0] ? props.onAdd : 
                    props.value == values[1] ? props.onShowResult :
                    props.value == values[2] ? props.onSubmitNew : 
                    props.value == values[3] ? props.onCancel : props.clickAnswer}
        >
            {props.value}
        </button>
    )
}