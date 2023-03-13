import React from 'react';
import '../../styles/components/PaperButton.style.scss'


const PaperButton = ({
                         className = '', buttonText = '', addInkAnimation = false,
                         element = <div/>, ...props
                     }) => {

    className += ' paper__button';

    if (addInkAnimation) {
        className += ' paper__button__ink';
    }

    return (
        <button className={className} {...props}>
            {buttonText}
            {element}
        </button>
    );
};

export default PaperButton;
