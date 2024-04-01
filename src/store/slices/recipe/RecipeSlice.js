import { createSlice } from '@reduxjs/toolkit'

const initialState= {
    recipes: [],
    message: {
        message: null,
        type: null,
    }
}


export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        getRecipes: (state, action) => {
            state.recipes = action.payload.recipes
        },
        newRecipe : (state, action) => {
            state.recipes = action.payload.newList
        },
        messageManagerRecipe: (state, action) => {
            state.message= action.payload
        }
    },
})

export const { getRecipes, newRecipe, messageManagerRecipe } = recipeSlice.actions
