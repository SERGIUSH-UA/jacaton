import React, {useEffect, useState} from 'react';
import '../../styles/components/ProfileCard.style.scss'
import {Col, Container, Row} from "react-bootstrap";
import PaperButton from "../buttons/PaperButton";
import * as Icon from 'react-bootstrap-icons';
import {useAppSelector} from "../../hooks/redux";

const ProfileCard = () => {

    const {user} = useAppSelector(state => state.userReducer);
    const [role, setRole] = useState('Спостерігач');

    useEffect(() => {
        if (user.teamId) {
            setRole('Учасник');
        }
        if (user.role.includes('Captain')) {
            setRole('Капітан');
        }
        if (user.role.includes('Admin')) {
            setRole('Адміністратор');
        }
    }, [user]);


    return (
        <Container className="mt-5">
            <Row className="d-flex justify-content-center">
                <Col className="col-md-7">
                    <div className="profile__card p-3 py-4 paper__border__v2">
                        <div className="text-center">
                            <img src={`${process.env.REACT_APP_SERVER_URL}/${user.img}`} width="100"
                                 className="rounded-circle"/>
                        </div>
                        <div className="text-center mt-3">
                            {user.teamId !== 0 &&
                                <span
                                    className="bg-secondary p-1 px-4 text-white paper__border__v3">Назва команди</span>}
                            <h5 className="mt-2 mb-0">{user.name}</h5>
                            <span>{role}</span>
                            <div className="px-4 mt-1">
                                <p className="fonts">{user.bio}</p>
                            </div>
                            <ul className="social-list">
                                <li><Icon.Facebook/></li>
                                <li><Icon.Instagram/></li>
                            </ul>
                            {user.id !== 0 && <div className="buttons">
                                <PaperButton buttonText='Знайти/створити команду'
                                             className="w-25 btn btn-outline-primary px-4"/>
                                <PaperButton buttonText={'Редагувати '} element={<Icon.PencilFill/>}
                                             className="w-25 btn btn-primary px-4 ms-3"/>
                            </div>}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileCard;
