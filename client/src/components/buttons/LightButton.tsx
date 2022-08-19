import React from 'react';
import {Button} from "react-bootstrap";
import '../../styles/components/LightButton.style.scss'

const LightButton = ({className = '', ...props}) => {
    className = className + 'light__button';
    return (
        <Button className={className} {...props}></Button>
    );
};

export default LightButton;
