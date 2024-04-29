import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    costs: [],
    message: {
        message: null,
        type: null,
    }
}


export const costsSlice = createSlice({
    name: 'costs',
    initialState,
    reducers: {
        getCosts: (state, action) => {
            state.costs = action.payload.costs
        },
        addCost: (state,action) => {
            console.log(action.payload)
            state.costs = [ action.payload.newCost, ...state.costs]
        },
        costsMsg: (state, action) => {
            state.message= action.payload
        }
    },
})

export const { getCosts,addCost, costsMsg } = costsSlice.actions
