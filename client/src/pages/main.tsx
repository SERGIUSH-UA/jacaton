import React from 'react';
import NavBar from "../components/nav-bar/NavBar";
import {Col, Container, Row} from "react-bootstrap";
import {useAppSelector} from "../hooks/redux";

const Main = () => {
    const {user} = useAppSelector(state => state.userReducer);
    return (
        <div>
            <NavBar />
            <Container fluid>
                <Row className='d-flex h-100'>
                    <Col xs={2} className='d-flex justify-content-center
                     align-items-center  paper__border'>
                        MENU
                    </Col>
                    <Col className='paper__border'>
                        CONTENT
                        {user.id}
                        {user.name}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Main;
