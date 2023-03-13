import React from 'react';
import {FormControl} from "react-bootstrap";
import '../../styles/components/PaperInput.style.scss';

const PaperInput = ({className = '', ...props}) => {
    className = className + ' paper__input';
    return (
        <FormControl className={className} {...props}>
        </FormControl>
    );
};

export default PaperInput;
