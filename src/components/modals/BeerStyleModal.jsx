import { Alert, Box, Button, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe, getAllRecipes } from "../../store/slices/recipe/thunks";
import "./modalStyles.css";
import { IngredientHandler } from "../ingredientsHandler/IngredientHandler";
import { clientAxios } from "../../api/ClientAxios";
import { modifyHasRecipe } from "../../store/slices/beerStyles/stylesSlice";
import { messageManagerRecipe } from "../../store/slices/recipe/RecipeSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "#0c0c0c",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "white",
  paddingTop: 0,
};

export const BeerStyleModal = ({ show, handleClose, beerStyle }) => {
  const dispatch = useDispatch();
  const { recipes, message } = useSelector((state) => state.recipes);
  const [recipeToShow, setRecipeToShow] = useState();
  const ingredientsTypes = ["malts", "hops", "yeasts", "cleanings", "others"];
  const [hasRecipe, setHasRecipe] = useState(false);
  const [ingredientsData, setIngredientsData] = useState([]);

  useEffect(() => {
    if (!recipes.length) {
      dispatch(getAllRecipes());
    }
    getIngredients();
  }, []);

  useEffect(() => {
    const recipe = recipes.find((recipe) => recipe.name === beerStyle.name);
    setRecipeToShow(
      recipe || {
        name: beerStyle.name,
      }
    );
    setHasRecipe(beerStyle?.hasRecipe);
  }, [beerStyle]);

  useEffect(() => {
    if (message.message) {
      setTimeout(() => {
        dispatch(messageManagerRecipe({}));
        handleClose();
      }, 3000);
    }
  }, [message]);

  const getIngredients = async () => {
    try {
      const { data } = await clientAxios("/ingredient/getIngredients");
      setIngredientsData(data.ingredientsList);
    } catch (error) {
      console.log(error);
    }
  };

  const modifyList = (newList) => {
    let type = newList?.ingredientsType;
    setRecipeToShow({
      ...recipeToShow,
      [type]: newList.ingredients,
    });
  };

  const handleSaveRecipe = () => {
    dispatch(addRecipe(recipeToShow));
    dispatch(modifyHasRecipe({ name: beerStyle.name }));
  };

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2>
          <u>{beerStyle?.name} Recipe</u>
        </h2>
        <div>
          {recipeToShow &&
            ingredientsTypes.map((type) => {
              return (
                <IngredientHandler
                  key={type}
                  ingredientType={type}
                  ingredients={recipeToShow[type]}
                  hasRecipe={hasRecipe}
                  ingredientsData={ingredientsData}
                  modifyList={modifyList}
                />
              );
            })}
          {message.message && (
            <Alert severity={message.type}>{message?.message}</Alert>
          )}
          <div className="button_container">
            <Button
              variant="contained"
              color="error"
              onClick={handleClose}
              disabled={message.message}
            >
              cancel
            </Button>
            {hasRecipe ? (
              <Button
                variant="contained"
                onClick={() => setHasRecipe(false)}
                disabled={message.message}
              >
                Edit Recipe
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleSaveRecipe}
                disabled={message.message}
              >
                Save Recipe
              </Button>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
};
