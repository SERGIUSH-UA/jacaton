import React, {useEffect} from 'react';
import { skipToken } from '@reduxjs/toolkit/query/react'
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {userSlice} from "../store/reducers/UserSlice";
import {userAPI} from "../services/user.service";
import {Navigate, Routes, Route} from "react-router-dom";
import Routs from "./index";
import Login from "../pages/login";
import Registration from "../pages/registration";
import Main from "../pages/main";

const AppRouter = () => {

    const {setUser, setToken} = userSlice.actions;
    const {token} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    const {data: userResp, error} = userAPI.useCheckAuthQuery(!token ? skipToken : false);


    useEffect(()=> {
        if(userResp){
            dispatch(setUser(userResp));
        }
    }, [userResp]);

    useEffect(() => {
        if(error){
        if ('data' in error) {
            console.log(JSON.stringify(error.data));
        }}
    }, [error]);


    useEffect(()=> {
        const localToken = localStorage.getItem('TOKEN');
        if(localToken){
            dispatch(setToken(localToken));
        }
    },[])

    return (
        <div>
            <Routes>
                <Route path={Routs.LOGIN} element={<Login/>}/>
                <Route path={Routs.REGISTRATION} element={<Registration/>}/>
                <Route path={Routs.MAIN} element={<Main/>}/>
                <Route path={'*'} element={<Navigate to="/" replace={true} />}/>
            </Routes>
        </div>
    );
};

export default AppRouter;
