import React, {useEffect, useRef, useState} from 'react';
import {Col, Container, Form, NavLink, Row} from "react-bootstrap";
import Routs from "../router";
import {useNavigate} from "react-router-dom";
import '../styles/pages/login.style.scss'
import TransparentInput from "../components/inputs/TransparentInput";
import PaperButton from "../components/buttons/PaperButton";
import {userAPI} from "../services/user.service";
import {userSlice} from "../store/reducers/UserSlice";
import {useAppDispatch} from "../hooks/redux";
import {IUserAuth} from "../models/IUser";

const Login = () => {

    const navigate = useNavigate();
    const refForm = useRef<HTMLFormElement>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [authUser,{data: token, error}] = userAPI.useLoginMutation();

    const {setToken} = userSlice.actions;
    const dispatch = useAppDispatch();

    useEffect(()=> {
        if(token?.token){
            localStorage.setItem('TOKEN', token.token);
            dispatch(setToken(token.token));
            navigate(Routs.MAIN);
        }
    }, [token])

    useEffect(() => {
        if(error){
            if ('data' in error) {
                console.log(JSON.stringify(error.data));
            }}
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
        </Container>
    );
};

export default Login;
