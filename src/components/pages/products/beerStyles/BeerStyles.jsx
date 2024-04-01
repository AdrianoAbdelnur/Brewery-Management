import React, { useEffect, useState } from "react";
import "./beerStyles.css";
import { BackArrow } from "../../../backbutton/BackArrow";
import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllStyles } from "../../../../store/slices/beerStyles/thunks";
import { Link } from "react-router-dom";
import { BeerStyleModal } from "../../../modals/BeerStyleModal";
import { AddStyleModal } from "../../../modals/AddStyleModal";

export const BeerStyles = () => {
  const dispatch = useDispatch();
  const { styles } = useSelector((state) => state.styles);
  const [showStyleModal, setShowStyleModal] = useState(false);
  const [style, setStyle] = useState({});
  const [showAddStyleModal, setShowAddStyleModal] = useState(false);

  useEffect(() => {
    if (!styles?.length) {
      dispatch(getAllStyles());
    }
  }, []);

  const handleRecipe = (style) => {
    setStyle(style);
    setShowStyleModal(true);
  };

  const handleCloseRecipe = () => {
    setStyle({});
    setShowStyleModal(false);
  };

  const handleOpen = () => setShowAddStyleModal(true);

  const handleCloseAddStyle = () => {
    setShowAddStyleModal(false);
  };

  return (
    <div className="beerStyles_container">
      <BackArrow />
      <div className="addStyle_Button_container">
        <Button
          className="AddStyle_Button"
          variant="contained"
          onClick={handleOpen}
        >
          Add New Style
        </Button>
      </div>
      <div className="styles_container">
        {styles.map((style) => {
          return (
            <ul key={style?._id}>
              <li>
                <Grid container>
                  <Grid item xs={4}>
                    <div>
                      Style: <b>{style?.name}</b>
                    </div>
                  </Grid>
                  <Grid item xs={5}>
                    <div>
                      Price/liter: <b>${style?.price}</b>
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div>
                      {style?.hasRecipe ? (
                        <Link
                          className="link"
                          component="button"
                          onClick={() => handleRecipe(style)}
                        >
                          Show Recipe
                        </Link>
                      ) : (
                        <Link
                          className="link"
                          component="button"
                          onClick={() => handleRecipe(style)}
                        >
                          Add Recipe
                        </Link>
                      )}
                    </div>
                  </Grid>
                </Grid>
              </li>
            </ul>
          );
        })}
      </div>

      <BeerStyleModal
        show={showStyleModal}
        handleClose={handleCloseRecipe}
        beerStyle={style}
      />

      <AddStyleModal
        show={showAddStyleModal}
        handleClose={handleCloseAddStyle}
      />
    </div>
  );
};
