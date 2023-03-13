import React, {useEffect, useRef, useState} from 'react';
import '../../styles/components/EditProfile.scss'
import {Wizard, WizardSection} from "../utils/Wizard";
import {Container, Form, Toast, ToastContainer} from "react-bootstrap";
import PaperModal from "../utils/PaperModal";
import PaperButton from "../buttons/PaperButton";
import * as Icon from "react-bootstrap-icons";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import PaperInput from "../inputs/PaperInput";
import {userSlice} from "../../store/reducers/UserSlice";
import {userAPI} from "../../services/user.service";
import {isErrorWithMessage} from "../../helpers/main.helpers";


const EditProfile = ({spanClassName = '', ...props}) => {
    const {className} = props;
    const [show, setShow] = useState<boolean>(false);
    const {user} = useAppSelector(state => state.userReducer);
    const {setUserValue} = userSlice.actions;
    const dispatch = useAppDispatch();
    const refForm = useRef<HTMLFormElement>(null);

    const [errorMessage, setErrorMessage] = useState('');
    const [openAlert, setOpenAlert] = React.useState(false);
    const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
        setErrorMessage('');
    };

    const [updateUser, {data: updatedUser, error: updatedUserError}] = userAPI.useEditMutation();

    useEffect(() => {
        if (updatedUser) {
            setShow(false);
        }
        if (updatedUserError) {
            if ('data' in updatedUserError) {
                setErrorMessage(JSON.stringify(updatedUserError.data));
            } else if (isErrorWithMessage(updatedUserError)) {
                setErrorMessage(updatedUserError.message);
            }
            setOpenAlert(true);
        }
    }, [updatedUser, updatedUserError])

    const sectionsEdit: WizardSection[] = [
        {
            title: 'first', element:
                <div>
                    <Form.Label>Ім'я</Form.Label>
                    <PaperInput value={user?.name}
                                id="name"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    dispatch(setUserValue({field: "name", value: e.target.value.toString()}))
                                }}
                                required
                                pattern=".{3,}"
                                title='Мінімум 3 символа'
                                placeholder={'Ім\'я'}/></div>
        },
        {
            title: 'second', element: <div>
                <Form.Label>Парафія</Form.Label>
                <PaperInput value={user?.parish}
                            id="parish"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                dispatch(setUserValue({field: "parish", value: e.target.value}))
                            }}
                            placeholder='Парафія'/></div>
        },
    ];

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
        console.log('show')
    };

    useEffect(() => {
        console.log('change call', show);
    }, [show]);

    const handleSubmitEditUser = async (e: React.MouseEvent<HTMLFormElement>) => {
        const form = refForm.current;

        if (form?.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            updateUser({user, id: user.id});
        } else {
        }

    }


    return (
        <span className={spanClassName}>
            <PaperButton
                className={className} buttonText={'Редагувати '} element={
                <Icon.PencilFill/>}
                onClick={handleShow}/>
            <PaperModal
                titleHead='Редагування профілю'
                content={<Container className='w-75 me-auto mb-auto'>
                    <Wizard acceptClick={handleSubmitEditUser} sections={sectionsEdit} refForm={refForm}/>
                </Container>}
                show={show}
                handleClose={handleClose}/>
            <ToastContainer className="p-2" position='top-end'>
            <Toast bg={'danger'} onClose={handleCloseAlert} show={openAlert} animation={true}
                   delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Помилка сервера</strong>
                    <small></small>
                </Toast.Header>
                <Toast.Body> {errorMessage}</Toast.Body>
            </Toast>
        </ToastContainer>

        </span>
    );
};

export default EditProfile;
