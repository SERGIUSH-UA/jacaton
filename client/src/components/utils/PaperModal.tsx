import React, {FC} from 'react';
import {Modal} from "react-bootstrap";
import '../../styles/components/PaperModal.style.scss'

interface IPaperModalProps {
    content: JSX.Element;
    show: boolean;
    handleClose: () => void;
    titleHead: string;
}

const PaperModal: FC<IPaperModalProps> = ({content, show, handleClose, titleHead}) => {

    const handleCloseModal = () => {
        handleClose();
    }

    return (
        <Modal
            show={show}
            onHide={handleCloseModal}
            backdrop="static"
            keyboard={false}
            centered
            fullscreen='md-down'
            className='paper__border__child'
        >
            <div className='paper__border__parent'>
                <Modal.Header closeButton>
                    <Modal.Title>{titleHead}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {content}
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default PaperModal;
