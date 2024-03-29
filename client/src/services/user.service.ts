import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IToken, IUser, IUserAuth, IUserRegister} from "../models/IUser";
import {RootState} from "../store/store";


interface IUserEdit {
    id: number;
    user: IUser;
}

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_SERVER_URL,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).userReducer.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
    }
        //https://youtu.be/AF2eMp25lA4?t=804
    }),
    tagTypes: ['User'],
    endpoints: (build) => ({
        checkAuth: build.query<IUser, boolean>({
            query: () => {
                return {
                    url: `/api/user/auth`
                }
            }, providesTags: result => ['User']
        }),
        login: build.mutation<IToken, IUserAuth>({
            query: (user:IUserAuth) => {
                return {
                    url: `/api/user/login`,
                    method: 'POST',
                    body: user
                }
            }, invalidatesTags: ['User']
        }),
        registration: build.mutation<IToken, IUserRegister>({
            query: (user: IUserAuth) => {
                return {
                    url: `/api/user/registration`,
                    method: 'POST',
                    body: user
                }
            }, invalidatesTags: ['User']
        }),
        edit: build.mutation<IToken, IUserEdit>({
            query: (arg) => {
                const {user, id} = arg;
                return {
                    url: `/api/user/${id}`,
                    method: 'PATCH',
                    body: user
                }
            }, invalidatesTags: ['User']
        })
    })

})