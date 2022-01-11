import React from "react";
import './CreateTodoButton.css';

function CreateTodoButton(props) {
    const onClickButton = () => {
        alert('Aquí se debería ver el modal');
    };

    return (
        <button 
            className="CreateTodoButton"
            onClick={onClickButton}
        >
            +
        </button>
    );
}

export { CreateTodoButton };