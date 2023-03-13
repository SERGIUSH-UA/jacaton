import React, {FC, useState} from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import PaperButton from "../buttons/PaperButton";
import {ArrowBarLeft, ArrowBarRight} from "react-bootstrap-icons";

export interface WizardSection {
    title: string;
    element: JSX.Element;
}

interface WizardProps {
    sections: WizardSection[];
    acceptClick: (e: React.MouseEvent<HTMLFormElement>) => void;
    refForm: React.RefObject<HTMLFormElement>;
}

export const Wizard: FC<WizardProps> = ({sections, acceptClick, refForm}) => {

    const [currentSection, setCurrentSection] = useState(0);

    const handleClickControl = (e: React.MouseEvent<HTMLButtonElement>, payload: number) => {
        const button = e.currentTarget as HTMLButtonElement;
        if (button) {
            e.preventDefault();
            e.stopPropagation();
        }
        setCurrentSection(prevState => prevState + payload);
    }

    return (
        <Container fluid>
            <Form ref={refForm} onSubmit={(e) => e.preventDefault()}>
                {sections.map((section, index) =>
                    <section key={index}>{index === currentSection && section.element}</section>
                )}
                <Row className='d-flex mt-4'>
                    <Col className='d-flex justify-content-center align-items-center'>
                        {currentSection > 0 && <PaperButton
                            buttonText="Попередня"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClickControl(e, -1)}
                            element={<ArrowBarLeft/>}/>}
                    </Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                        {currentSection < sections.length - 1 && <PaperButton
                            buttonText="Наступна"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClickControl(e, 1)}
                            element={<ArrowBarRight/>}/>}
                        {currentSection === sections.length - 1 && <PaperButton
                            buttonText="Підтвердити"
                            // className='btn-outline-secondary'
                            style={{background: '#FFE656'}}
                            onClick={(e: React.MouseEvent<HTMLFormElement>) => acceptClick(e)}
                        />}
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default Wizard;
