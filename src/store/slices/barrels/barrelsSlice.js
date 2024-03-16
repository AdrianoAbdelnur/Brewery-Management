import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    barrels: [],
    isLoading: true
}

export const barrelSlice = createSlice({
    name: 'barrels',
    initialState,
    reducers: {
        getBarrels: (state, action) => {
            state.barrels = action.payload.barrels
        },
    },
})

export const { getBarrels } = barrelSlice.actions
