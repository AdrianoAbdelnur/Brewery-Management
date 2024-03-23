import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    styles: [],
    message: {
        message: null,
        type: null,
    }
}

export const stylesSlice = createSlice({
    name: 'styles',
    initialState,
    reducers: {
        getStyles: (state, action) => {
            state.styles = action.payload.styles
        },
        addStyle: (state, action) => {
            state.styles = [...state.styles, action.payload.styles]
        },
        stylesmsg: (state, action) => {
            state.message= action.payload
        }
    },
})

export const { getStyles, addStyle , stylesmsg} = stylesSlice.actions
