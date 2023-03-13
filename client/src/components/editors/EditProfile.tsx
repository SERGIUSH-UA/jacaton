import React, {useEffect, useState} from 'react';
import '../../styles/components/EditProfile.scss'
import {Wizard, WizardSection} from "../utils/Wizard";
import {Container, Form} from "react-bootstrap";
import PaperModal from "../utils/PaperModal";
import PaperButton from "../buttons/PaperButton";
import * as Icon from "react-bootstrap-icons";
import {useAppSelector} from "../../hooks/redux";
import PaperInput from "../inputs/PaperInput";


const EditProfile = ({spanClassName = '', ...props}) => {
    const {className} = props;
    const [show, setShow] = useState<boolean>(false);
    const {user} = useAppSelector(state => state.userReducer);

    const sectionsEdit: WizardSection[] = [
        {
            title: 'first', element:
                <div>
                    <Form.Label>Username</Form.Label>
                    <PaperInput value={user.name} placeholder='User name'/></div>
        },
        {title: 'first', element: <div>2</div>},
        {title: 'first', element: <div>3</div>},
        {title: 'first', element: <div>4</div>},
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


    return (
        <span className={spanClassName}>
            <PaperButton
                className={className} buttonText={'Редагувати '} element={
                <Icon.PencilFill/>}
                onClick={handleShow}/>
            <PaperModal
                titleHead='Редагування профілю'
                content={<Container className='w-75 me-auto mb-auto'>
                    <Wizard acceptClick={() => {
                    }} sections={sectionsEdit}/>
                </Container>}
                show={show}
                handleClose={handleClose}/>
        </span>
    );
};

export default EditProfile;
