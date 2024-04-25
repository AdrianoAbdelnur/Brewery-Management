import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productions: [],
    message: {
        message: null,
        type: null,
    }
}

export const productionsSlice = createSlice({
    name: 'productions',
    initialState,
    reducers: {
        getProductions: (state, action) => {
            state.productions = action.payload.productions
        },
        addProduction: (state, action) => {
            state.productions = [action.payload.production, ...state.productions]
        
        },
        productionsMsg: (state, action) => {
            state.message= action.payload
        }
    },
})

export const { getProductions, addProduction, productionsMsg } = productionsSlice.actions
