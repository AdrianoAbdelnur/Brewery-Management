import { createSlice } from '@reduxjs/toolkit'

const initialState= {
    sales:[]
}

export const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        getSales: (state, action) => {
            state.sales = action.payload.sales
        },
      
    },
})

export const { getSales } = salesSlice.actions
