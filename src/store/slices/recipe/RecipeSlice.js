import { createSlice } from '@reduxjs/toolkit'

const initialState= {
    recipes: [],
    message: ""
}


export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        getRecipes: (state, action) => {
            state.recipes = action.payload.recipes
        },
        newRecipe : (state, action) => {
            console.log(action.payload.newRecipe)
            state.recipes = state.recipes.map((recipe) => {
                if (recipe.name = action.payload.newRecipe.name) {
                    return action.payload.newRecipe
                } return recipe
            })
            console.log(state.recipes)
        }
    },
})

export const { getRecipes, newRecipe } = recipeSlice.actions
