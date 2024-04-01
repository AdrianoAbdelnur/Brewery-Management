import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IngredientsInputs } from "./IngredientsInputs";

export const IngredientHandler = ({
  ingredientType,
  ingredients,
  hasRecipe,
  ingredientsData,
  modifyList,
}) => {
  const [showInputs, setShowInputs] = useState(false);
  const [filteredIngredients, setFilteredIngredients] = useState();

  const hideInputs = () => {
    setShowInputs(false);
  };

  useEffect(() => {
    setFilteredIngredients(
      ingredientsData.filter((item) => {
        if (
          ingredientType
            .toUpperCase()
            .includes(item.ingredientType.toUpperCase()) ||
          item.ingredientType
            .toUpperCase()
            .includes(ingredientType.toUpperCase())
        ) {
          return true;
        }
        return false;
      })
    );
  }, [ingredientType]);

  const deleteItem = (_id) => {
    const ingredientsFilteres = ingredients.filter(
      (ingredient) => ingredient._id !== _id
    );
    modifyList({
      ingredientsType: ingredientType,
      ingredients: ingredientsFilteres,
    });
  };

  return (
    <div>
      <h4 style={{ margin: "0" }}>{ingredientType.toUpperCase()}</h4>
      {ingredients?.length ? (
        <div>
          <ul style={{ margin: "0" }}>
            {ingredients?.map((item) => {
              return (
                <li key={item._id}>
                  <Grid container>
                    <Grid item xs={6}>
                      <div>{item.item.name || item.name}</div>
                    </Grid>
                    <Grid item xs={2}>
                      <div>
                        {item.quantity} {item.item.units || item.units}
                      </div>
                    </Grid>
                    {!hasRecipe && (
                      <Grid item xs={2}>
                        <Link
                          className="link"
                          component="button"
                          onClick={() => deleteItem(item._id)}
                        >
                          delete item
                        </Link>
                      </Grid>
                    )}
                  </Grid>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <>
          <div>there aren´t {ingredientType} in this recipe </div>
        </>
      )}

      {!hasRecipe &&
        (showInputs ? (
          <>
            <IngredientsInputs
              ingredientType={ingredientType}
              hideInputs={hideInputs}
              ingredientsData={filteredIngredients}
              ingredients={ingredients || []}
              modifyList={modifyList}
            />
          </>
        ) : (
          <Link
            className="link"
            component="button"
            onClick={() => setShowInputs(true)}
          >
            add a {ingredientType.slice(0, -1)}
          </Link>
        ))}
    </div>
  );
};
