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
            console.log(action.payload.style)
            state.styles = [...state.styles, action.payload.style]
        },
        modifyHasRecipe: (state, action) => {
            state.styles = state.styles.map(style => {
                if (style.name === action.payload.name) {
                    return {
                        ...style,
                        hasRecipe: true
                    }                    
                }
                return style
            })
        },
        stylesmsg: (state, action) => {
            state.message= action.payload
        }
    },
})

export const { getStyles, addStyle , stylesmsg, modifyHasRecipe} = stylesSlice.actions
