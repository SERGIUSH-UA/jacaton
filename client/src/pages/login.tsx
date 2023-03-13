import React, {useEffect, useRef, useState} from 'react';
import {Col, Container, Form, NavLink, Row, Toast, ToastContainer} from "react-bootstrap";
import Routs from "../router";
import {useNavigate} from "react-router-dom";
import '../styles/pages/login.style.scss'
import TransparentInput from "../components/inputs/TransparentInput";
import PaperButton from "../components/buttons/PaperButton";
import {userAPI} from "../services/user.service";
import {userSlice} from "../store/reducers/UserSlice";
import {useAppDispatch} from "../hooks/redux";
import {IUserAuth} from "../models/IUser";
import {isErrorWithMessage} from "../helpers/main.helpers";

const Login = () => {

    const navigate = useNavigate();
    const refForm = useRef<HTMLFormElement>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [authUser, {data: token, error}] = userAPI.useLoginMutation();

    const [errorMessage, setErrorMessage] = useState('');
    const [openAlert, setOpenAlert] = React.useState(false);
    const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
        setErrorMessage('');
    };

    const {setToken} = userSlice.actions;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (token?.token) {
            localStorage.setItem('TOKEN', token.token);
            dispatch(setToken(token.token));
            navigate(Routs.MAIN);
        }
    }, [token])

    useEffect(() => {
        if(error) {
            if ('data' in error) {
                if (typeof error.data === 'object' &&
                    error.data != null &&
                    "message" in error.data &&
                    typeof error.data.message === "string") {
                    setErrorMessage(error.data.message);
                } else {
                    setErrorMessage(JSON.stringify(error.data));
                }
            } else if (isErrorWithMessage(error)) {
                setErrorMessage(error.message);
            }
            setOpenAlert(true);
        }
    }, [error]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        if (id === "email") {
            setEmail(value);
        }
        if (id === "password") {
            setPassword(value);
        }
    }

    const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
        const form = refForm.current;
        if (form?.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            authUser({email, password} as IUserAuth);
        }
    }

    return (
        <Container style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg.webp)`,
            backgroundSize: 'cover'
        }} className='login-page vh-100 vw-100 d-flex' fluid>

            <Row className='ms-auto me-auto align-items-center justify-content-center'>
                <Form ref={refForm} className='form-login paper__border'>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label style={{color: 'white'}}>Email</Form.Label>
                        <TransparentInput
                            autoComplete="username"
                            required
                            value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(e)}
                            className='input-white' type="email" placeholder="Введіть email"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label style={{color: 'white'}}>Пароль</Form.Label>
                        <TransparentInput
                            autoComplete="current-password"
                            required value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(e)}
                            pattern=".{6,}"
                            title='Мінімум 6 символів'
                            className='input-white' type="password" placeholder="Пароль"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <NavLink className='register-link' type="checkbox" href={Routs.REGISTRATION}>Не маєте аккаунту?
                            Зареєструватись</NavLink>
                    </Form.Group>
                    <Row>
                        <Col>
                            <PaperButton className='w-100'
                                         onClick={(e: React.MouseEvent<HTMLFormElement>) => handleSubmit(e)}
                                         buttonText='Увійти' />
                        </Col>
                        <Col className='d-flex justify-content-end'>
                            <PaperButton className='w-100' buttonText='На головну'
                                         onClick={() => navigate(Routs.MAIN)}/>
                        </Col>
                    </Row>


                </Form>
            </Row>
            <ToastContainer className="p-2" position='top-end'>
                <Toast bg={'danger'} onClose={handleCloseAlert} show={openAlert} animation={true}
                       delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Помилка</strong>
                        <small></small>
                    </Toast.Header>
                    <Toast.Body> {errorMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
};

export default Login;
