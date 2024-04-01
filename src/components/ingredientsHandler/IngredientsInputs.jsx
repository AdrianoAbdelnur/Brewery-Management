import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

export const IngredientsInputs = ({
  ingredientType,
  hideInputs,
  ingredientsData,
  modifyList,
  ingredients,
}) => {
  const [ingredient, setIngredient] = useState();
  const [quantity, setQuantity] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    filter();
  }, [ingredients]);

  const addIngredient = () => {
    if (ingredient?.ingredient?.name !== "" && quantity !== "") {
      modifyList({
        ingredientsType: ingredientType,
        ingredients: [
          ...ingredients,
          {
            item: ingredient.ingredient._id,
            quantity: quantity,
            _id: ingredient.ingredient._id,
            units: ingredient.ingredient.units,
            name: ingredient.ingredient.name,
          },
        ],
      });
      hideInputs(true);
    }
  };

  const filter = () => {
    if (ingredients) {
      setFilteredList(
        ingredientsData.filter((ing) => {
          for (const ingredientInRecipe of ingredients) {
            if (
              ing?.name == ingredientInRecipe.name ||
              ing?.name == ingredientInRecipe.item.name
            ) {
              return false;
            }
          }
          return true;
        })
      );
    } else setFilteredList(ingredientsData);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container>
        <Grid item xs={4}>
          <div>
            <Autocomplete
              size="small"
              name="ingredient"
              id="ingredient"
              options={filteredList?.map((ingredient) => ({
                label: ingredient?.name,
                ingredient: ingredient,
              }))}
              freeSolo
              onChange={(e, newValue) => setIngredient(newValue)}
              renderInput={(params) => (
                <TextField
                  size="small"
                  {...params}
                  label="ingredient"
                  name="ingredient"
                  onChange={(e) => console.log(e)}
                />
              )}
            />
          </div>
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="quantity"
            name="quantity"
            label="quantity"
            type="number"
            size="small"
            autoComplete="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            size="small"
            style={{ alignItems: "center" }}
            onClick={addIngredient}
          >
            Add
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={hideInputs}
          >
            cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
