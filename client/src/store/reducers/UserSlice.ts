import {IUser} from "../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    user: IUser;
    isLoading: boolean;
    error: string;
    auth: boolean;
    token: string;
}

interface IChangeUserValue {
    field: string;
    value: string | number;
}

const initialState: UserState = {
    user: {
        id: 0, email: '', name: '', role: '', city: '', img: 'no-image-icon.png',
        isActivated: false, teamId: 0, bio: '', parish: ''
    },
    isLoading: false,
    error: '',
    auth: false,
    token: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
            if (state.user.id) {
                state.auth = true;
                state.isLoading = false;
            }
        },
        setUserValue(state, action: PayloadAction<IChangeUserValue>) {
            const payload = action.payload;
            // state.user = {...state.user, ...payload.};
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
            state.auth = true;
        },
        reset(state) {
            state.user = initialState.user;
        }
    }
})

export default userSlice.reducer;