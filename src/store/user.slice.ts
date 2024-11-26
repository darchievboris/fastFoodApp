import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loadState} from "./storege.ts";
import axios, {AxiosError} from "axios";
import {AuthInterface} from "../interfaces/auth.interface.ts";
import {PREFIX} from "../helpers/API.ts";

export interface UserState {
    jwt: string | null;
    loginErrorMessage?: string
}

export const JWT_PERSISTENT_STATE = 'userData'

export interface UserPersistentState {
    jwt: string | null

}

const initialState: UserState = {
    jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
}
export const login = createAsyncThunk('user/login',
    async (params: { email: string, password: string }) => {
        try {
            const {data} = await axios.post<AuthInterface>(`${PREFIX}/auth/login`, {
                email: params.email, password: params.password
            })
            return data
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message)
            }
        }
    })

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.jwt = null
        },
        clearLoginError: (stata) => {
            stata.loginErrorMessage = undefined
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            if(!action.payload){
                return
            }
            state.jwt = action.payload.access_token
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loginErrorMessage = action.error.message
        })
    }
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions