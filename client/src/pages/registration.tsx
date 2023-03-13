import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Col, Container, Form, NavLink, Row, Toast, ToastContainer} from "react-bootstrap";
import TransparentInput from "../components/inputs/TransparentInput";
import Routs from "../router";
import PaperButton from "../components/buttons/PaperButton";
import {userAPI} from "../services/user.service";
import {IUserRegister} from "../models/IUser";
import {userSlice} from "../store/reducers/UserSlice";
import {useAppDispatch} from "../hooks/redux";
import {isErrorWithMessage} from "../helpers/main.helpers";

const Registration = () => {
    const navigate = useNavigate();
    const refForm = useRef<HTMLFormElement>(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [registerUser,{data: token, error}] = userAPI.useRegistrationMutation();

    const {setToken} = userSlice.actions;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (token?.token) {
            localStorage.setItem('TOKEN', token.token);
            dispatch(setToken(token.token));
            navigate(Routs.MAIN);
        }
    }, [token])

    const [errorMessage, setErrorMessage] = useState('');
    const [openAlert, setOpenAlert] = React.useState(false);
    const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
        setErrorMessage('');
    };

    useEffect(() => {
        if (error) {
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
        if (id === "firstName") {
            setFirstName(value);
        }
        if (id === "lastName") {
            setLastName(value);
        }
        if (id === "email") {
            setEmail(value);
        }
        if (id === "password") {
            setPassword(value);
        }
        if (id === "confirmPassword") {
            setConfirmPassword(value);
        }

    }

    const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
        const form = refForm.current;

        if (form?.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            registerUser({email, firstName, lastName, password} as IUserRegister);
        } else {
        }

    }

    return (
        <Container style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg-reg-crop.jpg)`,
            backgroundSize: 'cover'
        }} className='registration-page vh-100 vw-100 d-flex' fluid>

            <Row className='ms-auto me-auto align-items-center justify-content-center'>
                <Form ref={refForm} className='form-login paper__border'>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label style={{color: 'white'}}>Email</Form.Label>
                        <TransparentInput
                            autoComplete="username" className='input-white' type="email"
                            required
                            value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(e)}
                            placeholder="Введіть email"/>
                    </Form.Group>
                    <Row>
                        <Col>
                            <TransparentInput
                                value={firstName} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleInputChange(e)} id="firstName"
                                className='input-white' placeholder="Ім'я"/>
                        </Col>
                        <Col>
                            <TransparentInput
                                className='input-white'
                                value={lastName} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleInputChange(e)} id="lastName"
                                placeholder="Прізвище"/>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label style={{color: 'white'}}>Пароль</Form.Label>
                        <TransparentInput
                            autoComplete="new-password" className='input-white' type="password"
                            required value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(e)}
                            pattern=".{6,}"
                            title='Мінімум 6 символів'
                            placeholder="Пароль"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="confirmPassword">
                        <TransparentInput
                            autoComplete="new-password" className='input-white' type="password"
                            required value={confirmPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(e)}
                            pattern=".{6,}"
                            title='Мінімум 6 символів'
                            placeholder="Повторіть пароль"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <NavLink className='register-link' type="checkbox" href={Routs.LOGIN}>Зареєстровані?
                            Увійти</NavLink>
                    </Form.Group>
                    <Row>
                        <Col>
                            <PaperButton className='w-100'
                                         // type='submit'
                                         onClick={(e: React.MouseEvent<HTMLFormElement>) => handleSubmit(e)}
                                         buttonText='Зареєструватись'/>
                        </Col>
                        <Col className='d-flex justify-content-end'>
                            <PaperButton className='w-100' variant="primary"
                                         type="button"
                                         onClick={() => navigate(Routs.MAIN)}
                                         buttonText='На головну'/>
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

export default Registration;
