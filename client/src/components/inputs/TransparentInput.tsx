import React from 'react';
import {FormControl} from "react-bootstrap";
import '../../styles/components/TransparentInput.style.scss'

const TransparentInput = ({className = '', ...props}) => {
    className = className + ' trans-input';
    return (
        <FormControl className={className} {...props}>

        </FormControl>
    );
};

export default TransparentInput;
