import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadState} from "./storege.ts";

export interface UserState {
    jwt: string | null
}
export const JWT_PERSISTENT_STATE = 'userData'
export interface UserPersistentState{
    jwt: string|null
}
const initialState: UserState = {
    jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt?? null
}
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addJwt: (state, action: PayloadAction<string>) => {
            state.jwt = action.payload
        },
        logout: (state) => {
            state.jwt = null
        }
    }
})

export const userReducer =  userSlice.reducer
export const userActions = userSlice.actions