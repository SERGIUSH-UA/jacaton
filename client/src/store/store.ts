import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from './reducers/UserSlice'
import {userAPI} from "../services/user.service";

const rootReducer = combineReducers({
    userReducer,
    [userAPI.reducerPath]: userAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(userAPI.middleware)
                //.concat(anotherAPI.middleware)
    })
}

export type RootState =  ReturnType<typeof rootReducer>
export type AppStore =  ReturnType<typeof setupStore>
export type AppDispatch =  AppStore['dispatch']