import { clientAxios } from "../../../api/ClientAxios"
import { getRecipes, newRecipe } from "./RecipeSlice"



export const getAllRecipes = () => {
    return async(dispatch) => {
        try {
            const {data} = await clientAxios("/recipe/getRecipes")
            dispatch(getRecipes({recipes: data.recipesList}))
        } catch (error) {
            console.log(error)     
        }
    }
}

export const addRecipe = (recipe) => {
    return async (dispatch) => {
        try {
            const {data} =await clientAxios.post("/recipe/newRecipe", recipe)
            if (data.recipeFound) {
                dispatch(newRecipe({newRecipe : data.recipeFound}))
            } else if (data.newRecipe) {
                dispatch(newRecipe({newRecipe : data.newRecipe}))
            }
        } catch (error) {
            console.log(error)
        }
    }
}