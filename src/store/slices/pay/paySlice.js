import { createSlice } from '@reduxjs/toolkit'

const initialState= {
    pay: [],
    message: {
        message: null,
        type: null,
    }
}

export const paySlice = createSlice({
    name: 'pay',
    initialState,
    reducers: {
        newPay: (state, action) => {
            state.pay = [...state.pay, action.payload.pay]
        },
        messageManager: (state, action) => {
            state.message= action.payload
        }
    },
})

export const { newPay , messageManager } = paySlice.actions
