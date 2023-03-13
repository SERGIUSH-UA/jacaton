import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import PaperButton from "../components/buttons/PaperButton";
import Login from "../pages/login";
import LightButton from "../components/buttons/LightButton";
import ProfileCard from "../components/cards/profileCard";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/PaperButton">
                <PaperButton/>
            </ComponentPreview>
            <ComponentPreview path="/Login">
                <Login/>
            </ComponentPreview>
            <ComponentPreview path="/LightButton">
                <LightButton/>
            </ComponentPreview>
            <ComponentPreview path="/ProfileCard">
                <ProfileCard/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;