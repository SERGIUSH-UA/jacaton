import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import Routs from "../../router";
import PaperButton from "../buttons/PaperButton";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux";

const NavBar = () => {
    const navigate = useNavigate();
    const {user} = useAppSelector(state => state.userReducer);
    return (
        <Navbar bg="primary"  variant="dark" className='paper__border'>
            <Container>
                <Navbar.Brand href={Routs.MAIN}>{process.env.REACT_APP_WEBSITE_NAME}</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href={Routs.MAIN}>Головна</Nav.Link>
                    <Nav.Link href={Routs.TEAMS}>Команди</Nav.Link>
                    <Nav.Link href={Routs.PROFILE}>Профіль</Nav.Link>
                </Nav>
                {!user.id ?
                    <PaperButton addInkAnimation={true} buttonText='Увійти' onClick={() => navigate(Routs.LOGIN)}/>
                    :
                    <PaperButton addInkAnimation={true} buttonText='Вийти' onClick={() => {
                        localStorage.removeItem('TOKEN');
                        navigate(Routs.LOGIN)}}/>
                }
            </Container>
        </Navbar>
    );
};

export default NavBar;
