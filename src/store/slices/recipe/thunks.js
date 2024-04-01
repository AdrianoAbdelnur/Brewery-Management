import { clientAxios } from "../../../api/ClientAxios"
import { getRecipes, messageManagerRecipe, newRecipe } from "./RecipeSlice"



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
    return async (dispatch, getState) => {  
        try {
            const { recipes } = getState().recipes
            const name = recipe?.name
            const {data} = await clientAxios.post("/recipe/newRecipe", recipe)
            if (data.recipeFound) {
                let newList = recipes.map((recipe) => {
                    if (recipe.name === data.recipeFound.name) {
                        return data.recipeFound
                    } return recipe
                })
                dispatch(newRecipe({newList}))
                dispatch(messageManagerRecipe({
                    message: data.message,  
                    type: "success"
                }))
            } else if (data.newRecipe) {
                let newList = [...recipes, recipe]
                dispatch(newRecipe({newList}))
                await clientAxios.patch("/styles/updateRecipe", {name, hasRecipe: true})
                dispatch(messageManagerRecipe({
                    message: data.message,  
                    type: "success"
                }))
            }
        } catch (error) {
            dispatch(messageManagerRecipe({
                message: error.response.data.message,  
                type: "error"
            }))
        }
    }
}