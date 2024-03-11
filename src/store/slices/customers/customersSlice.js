import { createSlice } from '@reduxjs/toolkit'

const initialState= {
    customers: [],
    isLoading: true
}

export const customersSlice = createSlice({
    name:'customers',
    initialState,
    reducers: {
        allCustomers: (state, action) => {
            state.customers = action.payload.customers
            state.isLoading = false
        },
        addCustomer: (state, action) => {
            state.customers = action.payload.customers
        },
        updateCustomer: (state, action) => {
            state.customers = action.payload.customers
        },
        deleteACustomer: (state, action) => {
            state.customers = action.payload.customers
        },
    },
})

export const { allCustomers, addCustomer, updateCustomer, deleteACustomer } = customersSlice.actions
