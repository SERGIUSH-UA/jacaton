import React from 'react';
import NavBar from "../components/nav-bar/NavBar";
import ProfileCard from "../components/cards/profileCard";
import '../styles/pages/profile.style.scss'

const Profile = () => {
    return (
        <div>
            <NavBar/>
            <ProfileCard/>
        </div>
    );
};

export default Profile;
