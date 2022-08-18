import React from 'react';
import './PaperButton.style.scss'

const PaperButton = ({className = '', buttonText = '', addInkAnimation = false, ...props}) => {

    className += ' paper__button';

    if(addInkAnimation) {
        className += ' paper__button__ink';
    }

    return (


        <button className={className} {...props}>
            {buttonText}
        </button>
    );
};

export default PaperButton;
