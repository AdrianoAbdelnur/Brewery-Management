import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    isLogged: false,
    token: "",
    message: {},
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user,
            state.isLogged= true,
            state.token= action.payload.token,
            state.message= "User Logged successfully"
        },
        logout: (state) => {
            state.user = null
            state.isLogged= false
            localStorage.removeItem("jwtoken")
        },
        authMessage: (state, action) => {
            state.message = action.payload
        }
    },
})

export const { login, logout, authMessage } = authSlice.actions;
